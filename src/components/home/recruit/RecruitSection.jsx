import Recruit from './Recruit';

export default function RecruitSection() {
    return (
            <Recruit>
                <Recruit.ItemBox>
                    <Recruit.Title />
                    <Recruit.TimerTitle />
                    <Recruit.Timer />
                    <Recruit.Button />
                </Recruit.ItemBox>
                <Recruit.Motion />
            </Recruit>
    )
}