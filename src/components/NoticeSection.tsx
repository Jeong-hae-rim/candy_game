import { ReactNode, useEffect, useState } from "react";

interface Notice {
  id: number;
  title: string;
  titleEn?: string;
  date: string;
  summary: string;
  body: ReactNode[]; // 기본(한국어) 본문
  bodyEn?: ReactNode[]; // 선택: 영어 본문
}

const notices: Notice[] = [
  {
    id: 1,
    title: "비밀결사대 수칙",
    titleEn: "Secret Club Protocol",
    date: "2025-11-09",
    summary: "우리 동아리의 비밀 수칙을 꼭 읽어줘.",
    body: [
      <ol>
        <li>&nbsp;호열이랑 대만이한테 절대 들키지 않기!</li>
        <li>
          &nbsp;비밀결사대 동아리 입장 시 암구호는 "호열이가 대만이한테 고백한
          날"
        </li>
        <li>
          &nbsp;주머니통신에 올리는 모든 제보는 익명 보장, 하지만 선 넘는 악성
          제보는 삭제될 수 있다!
        </li>
        <li>
          &nbsp;행사 관련 쪽지를 주고받을 땐 반드시 '스포 주의' 표시 후 접어서
          공유하기.
        </li>
        <li>
          &nbsp;우리 써방명은 [모열디만], [묘멸먜먄], [모딤], [호댐],
          [ㅎㅇㄷㅁ], [요미츄♡]이다.
        </li>
        <br />
        <br />
      </ol>,
    ],
    bodyEn: [
      <ol>
        <li>&nbsp;DO NOT get caught by Mito or Mitsui. SERIOUS.</li>
        <li>&nbsp;Entry code phrase: “The day Mito confessed to Mitsui”</li>
        <li>
          &nbsp;All Pocket-Comm reports are anonymous, but toxic ones will be
          deleted! 😇
        </li>
        <li>
          &nbsp;When sending event notes, ALWAYS write “Spoiler Alert”, then
          fold it before you pass it on!
        </li>
        <li>
          &nbsp; Our search blocking words would be : Mhooomisss, Yummy-chu♡,
          Yamichuuuu, Yachtmissyou, MM, HYDM, YMT.
        </li>
        <br />
        <br />
      </ol>,
    ],
  },
  {
    id: 2,
    title: "비밀결사대 창단 서사",
    titleEn: "Secret Club : How It All Started",
    date: "2025-11-10",
    summary: "우리 비밀결사대가 만들어진 이유다.",
    body: [
      <p>
        &nbsp;&nbsp;활기찬 봄을 맞아 평화로웠던 북산고. <br /> <br />
        &nbsp;&nbsp;그러나 신입생들을 맞아 떠들썩했던 분위기도 잠시, 북산고
        여고생들 사이에서는 기묘한 분위기가 감돌게 된다. 그 시작은 한
        풍문으로부터 비롯되었는데 그 소문인즉슨, 해동중의 전설로 불리는 1학년 양
        모 군이 자신의 무리에서 벗어나려는 3학년 정 모 군에게 집착하여 이른바
        농구부 최후의 날을 일으켰다는 것. <br /> <br />
        &nbsp;&nbsp;이 소문은 농구부의 미래를 위해 겉으로는 쉬쉬대며 암암리에
        떠돌았으나, 이 이야기에 눈을 빛내는 이들이 있었으니···. 그들은 처음엔
        흘러가는 이야기로 자신들의 추측과 소망을 서로 한마디씩 던져보는 게
        전부였으나 이는 점점 같은 취향을 가진 학생들 사이에서 하나로 모이며 살이
        붙여지고 실체를 가지기 시작했다. 그렇게 양 모 군과 정 모 군의 뜨거운
        사랑의 소용돌이를 적극적으로 탐구하는 비밀조직이 창설되는데···. <br />
        <br />
        &nbsp;&nbsp; 이윽고 시간은 흘러 어느덧 여름. <br />
        <br />
        &nbsp;&nbsp;양호열이 농구 경기가 한창 진행 중인 가운데 수많은 관중
        앞에서 정대만에게 공개 고백을 한 기념비적인 6월 13일, 이른바 ‘이마와
        스키사 데이'라는 선물이 찾아오고야 만 것. 비밀리에 마음으로만 소중히
        간직(하지는 않고 각종 연성으로 비벼먹곤)했던 내 주식이 드디어 상장되고
        떡상했다는 기쁨을 억누를 수 없게 된 비밀결사대 부원들은 공식이 판을
        깔아주는데 우리도 질 수 없다는 마음으로, 이런 좋은 날 행사를 열어 내
        CP가 공식임을 다 함께 축하하는 자리를 만들기로 하는데⁉️
        <br />
        <br />
        &nbsp;&nbsp;그치만 쉿🤫 다들 알지? <br />
        &nbsp;&nbsp;양모열과 정디만한테는 비밀이야! <br />
        <br />
        &nbsp;&nbsp; ‼️ 절대 들키지 말 것 ‼️
        <br />
        <br />
        &nbsp;&nbsp;※본 행사는 슬램덩크의 세계관이 현시대에 실제로 존재한다는
        설정에 기반하여 북산고에 재학 중인 모열디만(둘에게 들키지 않기 위해
        결사대원끼리 사용하는 별칭 중 하나)을 사랑하는 학생들이 본체들의 눈을
        피해 행사를 기획한다는 스토리라인을 가지고 있으며, 부스 참가자 및
        참관객들이 직접 북산고 비밀결사대의 일원이 되어 행사에 참여하는
        인터랙티브한 참여형•체험형 이벤트를 지향하고 있습니다!
        <br />
        <br />
      </p>,
    ],
    bodyEn: [
      <p>
        &nbsp;&nbsp;Let me tell you how our secret club came to be. <br />{" "}
        <br />
        &nbsp;&nbsp;Spring at Shohoku High was peaceful as usual - until a very
        weird rumor started floating around the girls. Apparently, the legendary
        freshman from the Middle, Y, was obsessed with senior M, and that
        obsession caused the infamous “Last Day of the Basketball Club.” 💥{" "}
        <br /> <br />
        &nbsp;&nbsp;The rumor was hushed up on the surface for the sake of the
        team’s future, yet secretly spread among those whose eyes sparkled at
        the tale… At first, it was nothing more than harmless speculation and
        shared fantasies. <br />
        <br />
        &nbsp;&nbsp; But as like-minded students gathered, their whispers grew
        flesh and form, and those tiny whispers united into one group. Boom‼️
        Secret Club founded. - a club devoted to exploring the fiery bond
        between Y & M. <br />
        <br />
        &nbsp;&nbsp;Summer arrived, and then came June 13 - the unforgettable
        day Mito publicly confessed to Mitsui, before a stadium full of
        spectators in the middle of a heated basketball game.
        <br />
        <br />
        &nbsp;&nbsp;It was a moment later nicknamed,“Imawa Sukisa Day,” felt
        like a miracle to the Secret Club:
        <br />
        <br />
        &nbsp;&nbsp;the pairing they had treasured and reimagined in secret had
        suddenly become canon.
        <br />
        <br />
        &nbsp;&nbsp;With the world setting the perfect stage, they decided to
        celebrate openly - or as openly as a secret group could - by creating an
        event to honor their now-official CP.
        <br />
        <br />
        &nbsp;&nbsp;But hush… 🤫 <br />
        &nbsp;&nbsp;This must never reach Mito or Mitsui!
        <br />
        <br />
        &nbsp;&nbsp; ‼️ DO NOT let them find out. ‼️
        <br />
        <br />
        &nbsp;&nbsp;※ This event assumes that the world of Slam Dunk exists in
        modern-day reality, and that Shohoku High students who adore
        “Yummy-chu♡” (one of their coded names) are secretly planning a
        celebration.
        <br />
        <br />
        &nbsp;&nbsp; Participants join the event as members of the Secret
        Society, enjoying an interactive, in-universe experience!
        <br />
        <br />
      </p>,
    ],
  },
  {
    id: 3,
    title: "온리전 개괄",
    titleEn: "Event Overview",
    date: "2025-11-14",
    summary: "우리 비밀결사대의 입장 및 장내 관련이야!",
    body: [
      <>
        <h3>[ 온리전 소개 ]</h3>
        <p>
          &nbsp;&nbsp;본 행사는 양호열 × 정대만 단일 CP 온리전입니다. 타 캐릭터
          및 타 커플링, 해당 행사의 리버스 & 리버시블 CP, 본 행사의 캐릭터가
          포함된 삼각 CP 관련 창작물의 반입/판매/배포/나눔 등의 활동을 모두
          금지합니다.
        </p>
        <h3>[ 입장 관련 ]</h3>
        <ol>
          <li>
            &nbsp;본 행사의 모든 참관은 2026년 행사 개최일 기준 연 나이
            17세(10년생) 이상이어야 하며, 주민등록번호 뒷자리의 맨 앞자리가
            짝수(2, 4)인 여성만 가능합니다.
          </li>
          <li>
            &nbsp;행사 당일 입장 시 사진, 이름, 생년월일이 기입된 국가 공인
            신분증(주민등록증/운전면허증/여권, 미성년자의 경우
            학생증/청소년증)을 지참해 주세요. (신분증 확인 후 입장이
            가능합니다.) 신청 시 폼을 통해 작성했던 내용과 신분증 상의 정보가
            일치하지 않으면 입장이 불가능합니다.
          </li>
          <li>
            &nbsp;본 행사에서 사전 제공한 입장 구매 폼을 통해 구매를 하셔야만
            입장이 가능하며, 행사 당일 입장 관련 현장 판매는 이루어지지
            않습니다. 단, 해외참관객 중 당일 현장 판매를 통해서만 입장이 가능한
            경우는 확인 후 예외 처리합니다.
          </li>
          <li>
            &nbsp;모든 참관객은 참가비에 포함된 전프레를 필수 구매하셔야 하며,
            대리수령은 불가합니다.
          </li>
        </ol>
        <h3>[ 장내 관련 ]</h3>
        <ol>
          <li>
            &nbsp;행사장 내부의 안전을 위하여 스태프의 지시를 반드시 따라주시기
            바랍니다.
          </li>
          <li>&nbsp;행사장 내 성인본 열람을 금지합니다.</li>
          <li>
            &nbsp;미성년자의 성인본 구입과 관련된 모든 책임은 미성년자 본인에게
            있습니다.
          </li>
          <li>
            &nbsp;행사장 내 냄새 나는 음식물 반입 및 섭취를 금지합니다. (뚜껑이
            있는 음료, 핑거푸드는 반입 및 섭취가 가능하나 섭취 후 참관객 선에서
            처리 부탁드립니다.)
          </li>
          <li>
            &nbsp;반려동물 동반 입장 및 캐릭터 코스프레 후 입장을 금지합니다.
          </li>
          <li>
            &nbsp;공지사항 미숙지로 인하여 발생하는 모든 문제에 대해서는 행사
            주최 측이 책임지지 않으므로 공지사항을 꼭 숙지해 주세요.
          </li>
        </ol>
        <br />
        <br />
      </>,
    ],
    bodyEn: [
      <>
        <h3>[ Event Description ]</h3>
        <p>
          &nbsp;&nbsp;This event is dedicated solely to the Mito Yohei (Yang
          Ho-yeol) × Mitsui Hisashi (Jung Dae-man) pairing. <br />
          &nbsp;&nbsp;All works involving other characters, other pairings,
          reverse/reversible variations of this CP, or any triangular
          relationships involving these characters are strictly prohibited :
          including bringing in, selling, distributing, or sharing such content.
        </p>
        <h3>[ Admission Guidelines ]</h3>
        <ol>
          <li>
            &nbsp;Age Eligibility: All attendees must be 17 years of age or
            older as of the event date in 2026 (i.e., individuals born in 2010
            or earlier).
          </li>
          <li>
            &nbsp;Gender & ID Eligibility: Entry is limited to female attendees
            whose national ID back digit begins with an even digit. (2 or 4).
            (For foreign attendees, the gender listed on the passport must be
            female.) <br /> &nbsp;All attendees must present a valid
            government-issued photo identification displaying their full name
            and date of birth (Resident Registration Card, Driver’s License,
            Passport; for minors: Student ID or Youth ID).
          </li>
          <li>
            &nbsp;Verification: Admission will be granted only if the attendee’s
            ID information fully matches the details submitted through the prior
            registration form. Mismatched information will result in denial of
            entry.
          </li>
          <li>
            &nbsp;Ticketing Policy: Only individuals who have purchased
            admission through the official pre-registration form will be
            permitted to enter. On-site ticket sales will not be conducted.
            Exceptions may be made for international attendees who are only able
            to purchase admission at the venue, pending verification.
          </li>
          <li>
            &nbsp;Pre–registration pack(official event goods package): All
            attendees are required to purchase the mandatory pre–registration
            pack(전프레/official event goods package) included in the
            participation fee. Proxy pickup is not allowed.
          </li>
        </ol>
        <h3>[ In-Venue Regulations ]</h3>
        <ol>
          <li>
            &nbsp;Attendees must follow all instructions issued by event staff
            for safety and operational purposes.
          </li>
          <li>
            &nbsp;Viewing of adult (R-18) content within the venue is strictly
            prohibited.
          </li>
          <li>
            &nbsp;Minors are fully responsible for any issues related to
            attempting to purchase adult materials.
          </li>
          <li>
            &nbsp;Food or beverages with strong odors are not allowed inside the
            venue.
          </li>
          <li>
            &nbsp;Drinks with lids and small finger foods are permitted, but
            please dispose of all waste personally.
          </li>
          <li>
            &nbsp;Pets and cosplay of any characters are not permitted within
            the venue.
          </li>
          <li>
            &nbsp;The organizers hold no liability for issues arising from an
            attendee’s failure to review the guidelines. Attendees are strongly
            encouraged to familiarize themselves with all official notices.
          </li>
        </ol>
        <br />
        <br />
      </>,
    ],
  },
  {
    id: 4,
    title: "부스 입장 안내",
    titleEn: "Booth Participation Guidelines",
    date: "2025-11-15",
    summary: "우리 동아리의 비밀 수칙을 꼭 읽어줘.",
    body: [
      <>
        <h3>[ 부스 신청 ]</h3>
        <ol>
          <li>
            &nbsp;1인 1부스 신청만 가능합니다. 중복으로 폼을 제출한 것이 확인될
            시, 신청하신 폼이 일괄 취소 및 환불 처리됩니다.
          </li>
          <li>
            &nbsp;부스 참가비 입금 후 부스 취소 및 환불은 불가하며, 이후 양도
            기간을 통하여 양도 신청이 가능합니다.
          </li>
          <li>&nbsp;입금 기간 내 입금되지 않은 부스는 자동 취소 처리됩니다.</li>
          <li>
            &nbsp;리버스/리버시블/타 CP를 암시하는 부스명의 경우 취소 처리하며
            이에 대한 문의는 받지 않습니다.
          </li>
          <li>&nbsp;개인 사정이나 단순 변심으로 인한 환불은 불가합니다.</li>
          <li>&nbsp;신청 시 받은 개인정보는 행사 종료 이후 파기됩니다.</li>
        </ol>
        <h3>[ 일반 부스 ]</h3>
        <ol>
          <li>
            &nbsp;해당 온리전은 호열대만 CP 단일 온리전으로, 호열대만 CP 성향이
            드러나는 굿즈 및 회지를 판매 지향합니다.
          </li>
          <li>
            &nbsp;부스 참가 시, 신간 회지 1종 혹은 신규 굿즈 2종을 필수 지참해야
            합니다.
          </li>
          <li>
            &nbsp;행사 당일 8p 이상의 신간 회지 또는 신규 굿즈 2종을 지참하신
            부스 참가자 분께는 신간보상 특전이 제공됩니다.
          </li>
          <li>
            &nbsp;공식 일러스트를 사용한 회지 및 굿즈, 타인의 저작권을 침해하는
            창작물 판매는 불가합니다.
          </li>
          <li>
            &nbsp;위생 및 안전상의 문제로 식음료, 화장품(비누, 향수), 인화성
            제품(라이터, 캔들), 도검류 등의 굿즈 판매 및 배포는 금지됩니다.
          </li>
          <li>
            &nbsp;타인에게 불쾌감을 줄 수 있는 디스플레이 및 타 CP/타 캐릭터
            등이 포함된 디스플레이를 지양합니다.
          </li>
          <li>
            &nbsp;일반 부스에서 성인본을 판매할 수 없습니다. 발견되는 즉시 판매
            중인 성인본을 회수하고, 행사 종료 후 돌려드립니다.
          </li>
          <li>
            &nbsp;당일 개인 물품을 별도로 보관해드리지 않습니다. 물품은 부스
            내에서 보관해 주셔야 하며, 중요 소지품의 경우 분실할 우려가 있으므로
            소지하고 다니시길 부탁드립니다.
          </li>
          <li>
            &nbsp;행사장 내에서 제공하는 탁자, 의자 등을 훼손하지 말아 주세요.
            (잘 떨어지지 않는 양면 접착제 등을 붙이거나, 칼로 탁자에 흠집을 내는
            등의 행위)
          </li>
        </ol>
        <h3>[ 성인 부스 & 성인본 판매 ]</h3>
        <ol>
          <li>
            &nbsp;성인 부스의 경우 모든 인원 (부스 참가자, 유/무료 입장객)이
            법적 성인이어야 합니다. 미성년자의 상주 및 입장이 확인되는 경우 즉각
            퇴장 조치됩니다.
          </li>
          <li>
            &nbsp;부스 참가자 전원의 연령보다 높은 수위의 창작물을 판매하거나
            배포할 수 없습니다.
          </li>
          <li>
            &nbsp;성인본 디스플레이 및 판매 시 opp 포장으로 밀봉된 상태여야
            합니다.
          </li>
          <li>
            &nbsp;디스플레이 및 판매되는 성인본에는 반드시 19세 미만 관람불가
            표기 또는 스티커를 부착하여야 합니다.
          </li>
          <li>
            &nbsp;성인본 판매 시 반드시 신분증과 팔찌를 확인한 후 판매가
            이루어져야 합니다.
          </li>
        </ol>
        <br />
        <br />
      </>,
    ],
    bodyEn: [
      <>
        <h3>[ Booth Application ]</h3>
        <ol>
          <li>
            &nbsp;Each participant may submit one booth application only.
            Multiple submissions will result in cancellation and refund of all
            related forms.
          </li>
          <li>
            &nbsp;Once the participation fee is paid, no cancellations or
            refunds are allowed. Booth transfer is available only during the
            official transfer period.
          </li>
          <li>
            &nbsp;Booths that are not paid for within the required payment
            period will be automatically canceled.
          </li>
          <li>
            &nbsp;Booth names implying reverse/reversible pairings, other CPs,
            or non-event pairings will be canceled without further inquiry.
          </li>
          <li>
            &nbsp;Refunds are not available for personal reasons or change of
            mind.
          </li>
          <li>
            &nbsp;All personal data collected during application will be deleted
            after the event.
          </li>
        </ol>
        <h3>[ General Booth Guidelines ]</h3>
        <ol>
          <li>
            &nbsp;This event is strictly dedicated to the Mito Youhei (Yang
            Ho-yeol) × Mitsui Hisashi (Jung Dae-man) pairing. Booths should
            primarily offer goods or publications featuring this pairing.
          </li>
          <li>
            &nbsp;Booths must prepare one new publication (8+ pages) or two
            newly created merchandise items.
          </li>
          <li>
            &nbsp;Use of official artwork or any content infringing copyright is
            prohibited.
          </li>
          <li>
            &nbsp;For hygiene and safety, items such as foods, cosmetics (soap,
            perfume), flammable goods (lighters, candles), and weapons or
            blade-like items may not be sold or distributed.
          </li>
          <li>
            &nbsp;Booths meeting the new-release requirement (one 8p+
            publication or 2 new goods) will receive a New Release Benefit on
            the event day.
          </li>
          <li>
            &nbsp;Avoid displays that may offend others, including those
            featuring other CPs or unrelated characters.
          </li>
          <li>
            &nbsp;General booths may not sell adult (R-18) content. Any
            discovered adult material will be collected and returned after the
            event.
          </li>
          <li>
            &nbsp;Personal belongings are not stored by staff; all items must be
            kept within the booth. Keep valuables with you to prevent loss.
          </li>
          <li>
            &nbsp;Please refrain from damaging venue equipment (tables, chairs,
            etc.), including adhesive use that leaves residue or
            cutting/scratching surfaces.
          </li>
        </ol>
        <h3>[ Adult Booth & Adult Content Regulations ]</h3>
        <ol>
          <li>
            &nbsp;All individuals involved with an adult booth, booth staff and
            all visiting attendees, must be legal adults. Minors found entering
            or staying within an adult booth will be immediately sent off from
            the venue.
          </li>
          <li>
            &nbsp;Booths may not sell or distribute adult material of a rating
            higher than the age of any participating booth member.
          </li>
          <li>
            &nbsp;All displayed or sold adult publications must be sealed in OPP
            packaging.
          </li>
          <li>
            &nbsp;All adult publications must display a clear “19+ / Adults
            Only” label or sticker.
          </li>
          <li>
            &nbsp;Sales of adult content require strict ID and event wristband
            verification for every transaction.
          </li>
        </ol>
        <br />
        <br />
      </>,
    ],
  },
  {
    id: 5,
    title: "일반 입장 안내",
    titleEn: "General Admission Guidelines",
    date: "2025-11-16",
    summary: "우리 온리전에 입장할 때 안내문이야!",
    body: [
      <>
        <ol>
          <li>&nbsp;입장권은 1인 1매 구매 가능합니다.</li>
          <li>
            &nbsp;구매 후 양도/취소/환불 모두 불가하므로 신중한 구매
            부탁드립니다.
          </li>
          <li>&nbsp;개인 사정이나 단순 변심으로 인한 환불은 불가합니다.</li>
          <li>
            &nbsp;주문자 임의로 폼 거래 종료 시 혹은 제출된 폼의 정보를 변경하여
            주문자 정보 불일치 등의 문제로 확인이 어려울 경우 입장 및 환불이
            불가합니다.
          </li>
          <li>
            &nbsp;입장 특전의 누락 및 파본 교환은 행사 당일 현장에서만 가능하며
            행사 종료 후에는 교환이 불가합니다. 배송 및 포장 과정에서 발생할 수
            있는 미세한 긁힘 혹은 찍힘은 파본으로 인정되지 않으니 양해
            부탁드립니다.
          </li>
          <li>
            &nbsp;행사 미참석 시 입장권 환불은 불가하며, 전프레의 경우 배송료를
            별도 결제 후 배송받을 수 있습니다.
          </li>
          <li>&nbsp;신청 시 받은 개인정보는 행사 종료 이후 파기됩니다.</li>
        </ol>
        <br />
        <br />
      </>,
    ],
    bodyEn: [
      <>
        <ol>
          <li>&nbsp;Each individual may purchase only one admission ticket.</li>
          <li>
            &nbsp;Please review your purchase carefully, as no transfers,
            cancellations, or refunds will be provided under any circumstances.
          </li>
          <li>
            &nbsp;Refunds are not available for personal reasons or change of
            mind.
          </li>
          <li>
            &nbsp;If the purchaser alters or closes the form on their own, or if
            the submitted information is changed in a way that prevents proper
            verification, both admission and refunds will be denied.
          </li>
          <li>
            &nbsp;Missing or damaged admission benefits can only be exchanged on
            the day of the event at the venue. No exchanges will be processed
            after the event. Minor marks or dents that may occur during shipping
            or packaging are not considered as defects.
          </li>
          <li>
            &nbsp; &nbsp;If you do not attend the event, your admission ticket
            cannot be refunded. Pre-registration benefits may still be shipped
            upon additional payment of the delivery fee.
          </li>
          <li>
            &nbsp;All personal information collected during registration will be
            securely deleted after the event concludes.
          </li>
        </ol>
        <br />
        <br />
      </>,
    ],
  },
];

export default function NoticeSection() {
  const [activeNotice, setActiveNotice] = useState<Notice | null>(null);
  const [useEnglish, setUseEnglish] = useState(false); // 🔥 번역 토글 상태
  const isOpen = !!activeNotice;

  const openNotice = (notice: Notice) => {
    setActiveNotice(notice);
    setUseEnglish(false); // 항상 한국어로 시작
  };

  const closeNotice = () => {
    setActiveNotice(null);
  };

  // ESC로 닫기 + 모달 열렸을 때 body 스크롤 잠그기
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeNotice();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const hasEnglish = !!activeNotice?.bodyEn && activeNotice.bodyEn.length > 0;
  const displayedTitle =
    useEnglish && activeNotice?.titleEn
      ? activeNotice.titleEn
      : activeNotice?.title;

  const displayedBody =
    useEnglish && hasEnglish ? activeNotice!.bodyEn! : activeNotice?.body;

  return (
    <>
      <h1>공지</h1>

      {/* 공지 카드 리스트 */}
      {notices.map((notice) => (
        <button
          key={notice.id}
          type="button"
          className="cardish notice-card"
          onClick={() => openNotice(notice)}
        >
          <div className="notice-card__header">
            <h3>{notice.title}</h3>
            <span className="muted">{notice.date}</span>
          </div>
          <p>{notice.summary}</p>
          <span className="notice-card__more">자세히 보기 ▼</span>
        </button>
      ))}

      {/* 모달 */}
      {activeNotice && (
        <div
          className="modal-backdrop"
          onClick={closeNotice} // 바깥 클릭 시 닫힘
        >
          <div
            className="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby={`notice-modal-title-${activeNotice.id}`}
            onClick={(e) => e.stopPropagation()} // 안쪽 클릭은 전파 막기
          >
            {/* 🔹 맨 위 헤더 - X 버튼만 */}
            <div className="gallery-modal__header">
              <button
                type="button"
                className={`translate-btn ${!hasEnglish ? "is-disabled" : ""}`}
                onClick={() => {
                  if (!hasEnglish) return; // 🔒 영어 없으면 아무 일 X
                  setUseEnglish((prev) => !prev); // 🔄 토글
                }}
                disabled={!hasEnglish} // 🔥 버튼 자체도 비활성
              >
                {hasEnglish
                  ? useEnglish
                    ? "한국어 보기"
                    : "View in English 🌍"
                  : "영문 없음"}
              </button>

              <button
                className="modal-close"
                type="button"
                onClick={closeNotice}
                aria-label="닫기"
              >
                ✕
              </button>
            </div>

            <h2 id={`notice-modal-title-${activeNotice.id}`}>
              {displayedTitle}
            </h2>

            <div className="notice-detail__body">
              {displayedBody?.map((para, idx) => (
                <div key={idx} className="notice-block">
                  {para}
                </div>
              ))}
            </div>
            <p className="muted">{activeNotice.date}</p>
          </div>
        </div>
      )}
    </>
  );
}
