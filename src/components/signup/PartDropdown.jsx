export default function PartDropdown({ form, setForm }) {
  return (
    <ul>
      <li
        value=''
        id='part'
        onClick={setForm({ ...form, part: '' })}
      >
        트랙 선택
      </li>
      <li
        value='front'
        id='part'
        onClick={setForm({ ...form, part: 'front' })}
      >
        프론트앤드
      </li>
      <li
        value='back'
        id='part'
        onClick={setForm({ ...form, part: 'back' })}
      >
        백앤드
      </li>
      <li
        value='PM/design'
        id='part'
        onClick={setForm({ ...form, part: 'PM/design' })}
      >
        기획/디자인
      </li>
    </ul>
  );
}
