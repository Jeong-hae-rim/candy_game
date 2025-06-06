import ISFJ_IMG from "../assets/images/mbti/ISFJ.png";
import ISFP_IMG from "../assets/images/mbti/ISFP.png";
import ISTJ_IMG from "../assets/images/mbti/ISTJ.png";
import ISTP_IMG from "../assets/images/mbti/ISTP.png";
import INTJ_IMG from "../assets/images/mbti/INTJ.png";
import INTP_IMG from "../assets/images/mbti/INTP.png";
import INFJ_IMG from "../assets/images/mbti/INFJ.png";
import INFP_IMG from "../assets/images/mbti/INFP.png";

import ESFJ_IMG from "../assets/images/mbti/ESFJ.png";
import ESFP_IMG from "../assets/images/mbti/ESFP.png";
import ESTP_IMG from "../assets/images/mbti/ESTP.png";
import ESTJ_IMG from "../assets/images/mbti/ESTJ.png";
import ENTP_IMG from "../assets/images/mbti/ENTP.png";
import ENTJ_IMG from "../assets/images/mbti/ENTJ.png";
import ENFP_IMG from "../assets/images/mbti/ENFP.png";
import ENFJ_IMG from "../assets/images/mbti/ENFJ.png";

interface Product {
  id: number;
  title: string;
  type: string;
  price: string;
  description: string;
  note: string;
}

export interface CardDataProps {
  infoData: CardProps;
  onClick: (card: CardProps) => void;
}

export type CardProps = {
  id: number; // 추가
  src: string;
  title: string;
  description: string;
  label: string;
  author: string[];
  product: Product[]; // 추가
};

export type FilterData = {
  id: number;
  src: string;
  title: string;
  description: string;
  label: string;
  author: string[];
  product: Product[];
}[];

export interface InfoDataProps {
  infoData: FilterData;
  onClick: (card: FilterData[number]) => void;
}

export const mbtiData: Record<string, { name: string; image: string }> = {
  ISTP: { name: "마왕", image: ISTP_IMG },
  ISFP: { name: "양키", image: ISFP_IMG },
  ISTJ: { name: "파일럿", image: ISTJ_IMG },
  ISFJ: { name: "메이드", image: ISFJ_IMG },
  INTP: { name: "퇴마사", image: INTP_IMG },
  INTJ: { name: "경호원", image: INTJ_IMG },
  INFJ: { name: "탐정", image: INFJ_IMG },
  INFP: { name: "문학소년", image: INFP_IMG },
  ENTJ: { name: "농구선수", image: ENTJ_IMG },
  ENTP: { name: "용사", image: ENTP_IMG },
  ENFJ: { name: "신부", image: ENFJ_IMG },
  ENFP: { name: "어린왕자", image: ENFP_IMG },
  ESTJ: { name: "경찰", image: ESTJ_IMG },
  ESFJ: { name: "감독", image: ESFJ_IMG },
  ESTP: { name: "연예인", image: ESTP_IMG },
  ESFP: { name: "양키", image: ESFP_IMG },
};

export interface CooperationItem {
  id: number;
  title: string;
  goods: string;
  category: string;
  src: string;
}

export interface CooperationType {
  id: number;
  nickname: string;
  x_id: string;
  cooperation_list: CooperationItem[];
}

export interface ExternalReview {
  id: string;
  platform: "x";
  url: string;
  title?: string;
}
