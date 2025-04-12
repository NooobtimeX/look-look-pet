"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { Reward } from "@/types/reward";

interface RewardPopupProps {
  reward: Reward | null;
  isMobile: boolean;
  open: boolean;
  onClose: () => void;
  onRedeem: (rewardId: string) => void;
}

export function RewardPopup({
  reward,
  isMobile,
  open,
  onClose,
  onRedeem,
}: RewardPopupProps) {
  if (!reward) return null;

  const rewardImage = "/Reward_placeholder.png"; // Replace if you have image URLs from backend

  const content = (
    <div className="space-y-4 text-sm text-muted-foreground px-4 pb-6">
      <div>
        <span className="text-xs uppercase text-gray-400">Discount</span>
        <p className="text-lg text-blue-600 font-semibold">
          {reward.discount}% OFF
        </p>
      </div>

      <div>
        <span className="text-xs uppercase text-gray-400">Partner</span>
        <p className="text-base text-foreground font-medium">
          {typeof reward.partner === "string"
            ? reward.partner
            : reward.partner?.name}
        </p>
      </div>

      <button
        onClick={() => reward && onRedeem(reward._id)}
        className="w-full mt-4 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Redeem Now
      </button>
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
        <DrawerContent className="rounded-t-2xl border bg-background">
          <DrawerHeader className="text-left space-y-1 px-4 pt-6">
            {" "}
            <img
              src={rewardImage}
              alt={reward.name}
              className="w-full h-48 object-cover rounded-xl"
            />
            <DrawerTitle className="text-2xl font-semibold">
              {reward.name}
            </DrawerTitle>
            <DrawerDescription className="text-base text-muted-foreground">
              {reward.description}
            </DrawerDescription>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="rounded-xl border bg-background p-0 overflow-hidden">
        <DialogHeader className="space-y-2 px-4 pt-6">
          {" "}
          <img
            src={rewardImage}
            alt={reward.name}
            className="w-full h-48 object-cover rounded-xl"
          />
          <DialogTitle className="text-2xl font-semibold">
            {reward.name}
          </DialogTitle>
          <DialogDescription className="text-base text-muted-foreground">
            {reward.description}
          </DialogDescription>
        </DialogHeader>
        {content}
      </DialogContent>
    </Dialog>
  );
}
