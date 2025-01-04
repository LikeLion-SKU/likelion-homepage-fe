import Admin from "./Admin";

export default function AdminSection() {

  return (
    <Admin>
      <Admin.Title />
      <Admin.Text />
      <Admin.ItemBox>
        <Admin.Button label="지원서 생성하기" path="create"/>
        <Admin.Button label="지원서 모아보기" path="apply"/>
        <Admin.Button label="프로젝트 편집하기" path="/"/>
        <Admin.Button label="멋사인 편집하기" path="/"/>
      </Admin.ItemBox>
    </Admin>
  );
}
