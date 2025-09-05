import { Helmet } from "react-helmet"
import { ExplorePageComponent } from "../../../components/User/Explore components"

export const ExplorePage = () => {
  return (
    <>
      <Helmet>
        <title>Explore - Mentorinho</title>
      </Helmet>
      <ExplorePageComponent />
    </>
  )
}
