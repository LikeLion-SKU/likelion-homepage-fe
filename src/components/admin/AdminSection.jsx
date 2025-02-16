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
          label='구성원 편집하기'
          path='about'
        />
        <Admin.Button
          label='면접일정 등록하기'
          path='create-interview'
        />
        <Admin.Button
          label='면접일정 조회하기'
          path='interview-scedule'
        />
      </Admin.ItemBox>
    </Admin>
  );
}
