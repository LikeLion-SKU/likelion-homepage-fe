import RecruitMain from "../components/recruitPage/RecruitMain";
import Schedule from "../components/recruitPage/Schedule";
import Requirement from "../components/recruitPage/Requirements";
import Question from "../components/recruitPage/Question";

export default function RecruitPage() {
    return(
        <>
            <RecruitMain/>
            <Schedule />
            <Requirement />
            <Question />
        </>
    )
}
