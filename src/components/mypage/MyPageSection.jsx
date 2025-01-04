import MyPage from './MyPage';

export default function MyPageSection() {
  return (
    <MyPage>
      <MyPage.Title />
      <MyPage.Text />
      <MyPage.ItemBox>
        <MyPage.Apply />
        <MyPage.Logout />
      </MyPage.ItemBox>
    </MyPage>
  );
}
