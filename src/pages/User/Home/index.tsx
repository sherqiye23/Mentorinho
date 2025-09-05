import { Helmet } from "react-helmet"
import { HomePageComponent } from "../../../components/User/Home components"

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Home - Mentorinho</title>
      </Helmet>
      <HomePageComponent />
    </>
  )
}

export default HomePage