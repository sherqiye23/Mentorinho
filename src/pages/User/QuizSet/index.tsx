import { Helmet } from "react-helmet"
import { QuizSetComponent } from "../../../components/User/Quizset components"

export const QuizSetPage = () => {
  return (
    <>
      <Helmet>
        <title>Quizset - Mentorinho</title>
      </Helmet>
      <QuizSetComponent />
    </>
  )
}
