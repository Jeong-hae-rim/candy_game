import { LetterId } from "./puzzle";

export type VNOpenPayload = {
  key: LetterId; // 어떤 글자/이벤트인지 식별자 (예: "Y")
  title?: string;
  imageSrc?: string | string[];
  speaker?: string | string[];
  lines: string[];
};

export function openVNModal(payload: VNOpenPayload) {
  window.dispatchEvent(
    new CustomEvent<VNOpenPayload>("vn:open", { detail: payload })
  );
}
