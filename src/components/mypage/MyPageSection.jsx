import MyPage from './MyPage';

export default function MyPageSection() {
  return (
    <MyPage>
      <MyPage.Profile>
        <MyPage.Text />
        <MyPage.Image />
      </MyPage.Profile>
      <MyPage.ItemBox>
        <MyPage.Apply />
        <MyPage.ChangePW />
        <MyPage.Logout />
      </MyPage.ItemBox>
    </MyPage>
  );
}
