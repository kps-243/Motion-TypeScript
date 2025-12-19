import { Types } from "mongoose";
import Challenge, { IChallengeDocument } from "../models/Challenge";
import ChallengeInvite, { IChallengeInviteDocument } from "../models/ChallengeInvite";

export type InviteAction = "ACCEPT" | "DECLINE";

export const inviteToChallenge = async (params: {
  challengeId: string;
  fromUserId: string;
  toUserId: string;
  message?: string;
}): Promise<IChallengeInviteDocument> => {
  const { challengeId, fromUserId, toUserId, message } = params;

  const challenge: IChallengeDocument | null = await Challenge.findById(challengeId);
  if (!challenge) throw new Error("Challenge introuvable");

  if (String(challenge.createdBy) !== String(fromUserId)) {
    throw new Error("Seul le créateur peut inviter");
  }

  if ((challenge.participants || []).some((u) => String(u) === String(toUserId))) {
    throw new Error("Cet utilisateur participe déjà au challenge");
  }

  if (String(fromUserId) === String(toUserId)) {
    throw new Error("Tu ne peux pas t’inviter toi-même");
  }

  return await ChallengeInvite.create({
    challenge: new Types.ObjectId(challengeId),
    fromUser: new Types.ObjectId(fromUserId),
    toUser: new Types.ObjectId(toUserId),
    message,
  });
};

export const getMyInvites = async (userId: string): Promise<IChallengeInviteDocument[]> => {
  return await ChallengeInvite.find({ toUser: userId })
                              .sort({ createdAt: -1 })
                              .populate("challenge")
                              .populate("fromUser", "name firstName email");
};

export const respondToInvite = async (params: {
  inviteId: string;
  userId: string;
  action: InviteAction;
}): Promise<IChallengeInviteDocument> => {
  const { inviteId, userId, action } = params;

  const invite: IChallengeInviteDocument | null = await ChallengeInvite.findById(inviteId);
  if (!invite) throw new Error("Invitation introuvable");

  if (String(invite.toUser) !== String(userId)) {
    throw new Error("Tu ne peux pas répondre à cette invitation");
  }

  if (invite.status !== "PENDING") {
    throw new Error("Invitation déjà traitée");
  }

  if (action === "ACCEPT") {
    invite.status = "ACCEPTED";
    await invite.save();

    await Challenge.findByIdAndUpdate(invite.challenge, {
      $addToSet: { participants: new Types.ObjectId(userId) },
    });

    return invite;
  }

  if (action === "DECLINE") {
    invite.status = "DECLINED";
    await invite.save();
    return invite;
  }

  throw new Error("Action invalide (ACCEPT ou DECLINE)");
};

export const cancelInvite = async (params: {
  inviteId: string;
  userId: string;
}): Promise<IChallengeInviteDocument> => {
  const { inviteId, userId } = params;

  const invite: IChallengeInviteDocument | null = await ChallengeInvite.findById(inviteId);
  if (!invite) throw new Error("Invitation introuvable");

  if (String(invite.fromUser) !== String(userId)) {
    throw new Error("Tu ne peux pas annuler cette invitation");
  }

  if (invite.status !== "PENDING") {
    throw new Error("Impossible d’annuler une invitation déjà traitée");
  }

  invite.status = "CANCELED";
  await invite.save();
  return invite;
};
