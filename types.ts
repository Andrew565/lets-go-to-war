import { PlayerCard } from "./PlayerCard";

export interface Card {
  rank: number;
  name: string;
  suit: Suit;
}

export const CardRankToName = [
  "Two",
  "Three",
  "Four",
  "Five",
  "Six",
  "Seven",
  "Eight",
  "Nine",
  "Ten",
  "Jack",
  "Queen",
  "King",
  "Ace",
];

export type Suit = "Clubs" | "Hearts" | "Spades" | "Diamonds";
export const Suits: Suit[] = ["Clubs", "Hearts", "Spades", "Diamonds"];

export type Deck = PlayerCard[];

export type Rule = () => void;

export interface StatisticsObject {
  turns: number;
  numberOfWars: number;
  warsWonByPlayer: { wins: number; playerId: number }[];
}
