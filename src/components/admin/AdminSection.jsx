import Admin from './Admin';

export default function AdminSection() {
  return (
    <Admin>
      <Admin.Title />
      <Admin.ItemBox>
        <Admin.Button
          label='지원서 생성하기'
          path='create'
        />
        <Admin.Button
          label='지원서 모아보기'
          path='apply'
        />
        <Admin.Button
          label='프로젝트 편집하기'
          path='project'
        />
        <Admin.Button
          label='멋사인 편집하기'
          path='about'
        />
      </Admin.ItemBox>
    </Admin>
  );
}
