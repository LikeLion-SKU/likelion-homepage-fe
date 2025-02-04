import { useNavigate } from 'react-router-dom';

import { useDeleteApplication, useUpdateApplicationActivation } from '@/hooks/useApplication';
import ApplicationBtnCard from './ui/ApplicationBtnCard';

export default function ApplicationBtn({ cohort, formId }) {
  const { isLoading, deleteApplication } = useDeleteApplication(formId);
  const { updateApplicationActivation } = useUpdateApplicationActivation(formId);

  const nav = useNavigate();
  return (
    <ApplicationBtnCard onClick={updateApplicationActivation}>
      <ApplicationBtnCard.ApplicationCohort cohort={cohort} />
      <ApplicationBtnCard.Dots
        onClick={function (e) {
          e.stopPropagation();
        }}
      />
      <ApplicationBtnCard.MenuList>
        {isLoading ? (
          <p>로딩중</p>
        ) : (
          <>
            <ApplicationBtnCard.MenuItem
              text='수정 하기'
              onClick={function (e) {
                e.stopPropagation();
                nav('/admin/edit/application');
              }}
            />
            <ApplicationBtnCard.MenuItem
              text='삭제 하기'
              onClick={function (e) {
                e.stopPropagation();
                deleteApplication();
              }}
            />
          </>
        )}
      </ApplicationBtnCard.MenuList>
    </ApplicationBtnCard>
  );
}
