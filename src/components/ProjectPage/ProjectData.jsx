import projectImage from "../../assets/project_image.jpg";

const projects = Array(9)
  .fill(null)
  .map((_, index) => ({
    id: index + 1,
    name: `2024 서경대학교 대동제 축제 안내 페이지 ${index + 1}`,
    description:
      "축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다. 축제 안내 웹페이지입니다.",
    tags: [
      index % 3 === 0
        ? "자체프로젝트"
        : index % 3 === 1
        ? "중앙해커톤"
        : "아이디어톤",
    ], // 다양한 태그 설정
    image: projectImage,
    teamMembers: {
      pm: ["김땡땡", "이땡땡"],
      design: ["박땡땡", "박땡땡"],
      "front-end": ["김땡땡", "이땡땡", "박땡땡", "박땡땡"],
      "back-end": ["김땡땡", "박땡땡"],
    }, // 팀 구성 추가
  }));

export default projects;

