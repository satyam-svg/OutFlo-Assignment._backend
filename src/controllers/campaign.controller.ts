import { Request, Response } from 'express';
import { prisma } from '../config/prisma.client';
import { CampaignStatus } from '@prisma/client';

const LINKEDIN_URL_REGEX = /^(https:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/;

type CampaignInput = {
  name?: string;
  description?: string;
  status?: CampaignStatus;
  leads?: string[];
  accountIds?: string[];
};

// GetAll Campaigns
export const getAllCampaigns = async (req: Request, res: Response): Promise<void> => {
  try {
    // फ़िल्टर हटा दें
    const campaigns = await prisma.campaign.findMany(); 
    res.json(campaigns);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch campaigns' });
  }
};
// Get Campaign by ID (Fixed)
export const getCampaignById = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await prisma.campaign.findUnique({
      where: { id: req.params.id } // Direct string ID
    });
    if (!campaign) {
      res.status(404).json({ error: 'Campaign not found' });
      return;
    }
    res.json(campaign);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Create Campaign
export const createCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description, status, leads, accountIds } = req.body;

    // Validate ObjectID format
    if (accountIds && !accountIds.every((id: string)=> /^[0-9a-fA-F]{24}$/.test(id))) {
      res.status(400).json({ error: 'Invalid ID format in accountIds' });
      return;
    }

    const newCampaign = await prisma.campaign.create({
      data: {
        name,
        description,
        status: status || 'Active',
        leads: leads || [],
        accountIds: accountIds || []
      }
    });
    
    res.status(201).json(newCampaign);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to create campaign' });
  }
};

// Update Campaign (Fixed)
export const updateCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name, description, status, leads, accountIds }: Partial<CampaignInput> = req.body;

    // Validate status
    if (status && !Object.values(CampaignStatus).includes(status)) {
      res.status(400).json({
        error: 'Invalid status',
        validStatuses: Object.values(CampaignStatus)
      });
      return;
    }

    const updatedCampaign = await prisma.campaign.update({
      where: { id: id }, // Direct string ID
      data: { name, description, status, leads, accountIds }
    });

    res.json(updatedCampaign);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      error: 'Update failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

// Delete Campaign (Fixed)
// Delete Campaign में भी सुधारें
export const deleteCampaign = async (req: Request, res: Response): Promise<void> => {
  try {
    const campaign = await prisma.campaign.update({
      where: { id: req.params.id },
      data: { 
        status: CampaignStatus.Deleted // <-- यहां भी enum का उपयोग
      }
    });
    res.json({ message: 'Campaign marked as deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Deletion failed' });
  }
};