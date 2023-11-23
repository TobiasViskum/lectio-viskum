type Props = { page: Pages };

export function getPageFromMap({ page }: Props) {
  const pageMap: { [key in Pages]: string } = {
    front: "forside.aspx",
    schedule: "SkemaNy.aspx",
    "studyPlan-calender": "studieplan.aspx",
    "studyPlan-educationDescription":
      "studieplan/undervisningsbeskrivelse.aspx",
    "studyPlan-studyDirection": "studieretningElevValg.aspx",
    "studyPlan-elective": "studieretningValgfag.aspx",
    "absence-overview": "subnav/fravaerelev.aspx",
    "absence-reasons": "subnav/fravaerelev_fravaersaarsager.aspx",
    assignments: "OpgaverElev.aspx",
    homework: "material_lektieoversigt.aspx",
    "grades-overview": "grades/grade_report.aspx",
    "grades-messages": "grades/grade_karakterblad.aspx",
    "borrowed-books": "BD/UserReservations.aspx",
    questionnaire: "spoergeskema/spoergeskema_rapport.aspx",
    "messages-newest": "beskeder2.aspx?mappeid=-70",
    "messages-unread": "beskeder2.aspx?mappeid=-40",
    "messages-all": "beskeder2.aspx?mappeid=-30",
    "messages-personal": "beskeder2.aspx?mappeid=-10",
    "messages-deleted": "beskeder2.aspx?mappeid=-60",
    "messages-favorites": "beskeder2.aspx?mappeid=-50",

    teachers:
      "subnav/members.aspx?holdelementid=35338545824&showteachers=1&showstudents=1&reporttype=classpicture",
  };

  return pageMap[page];
}
