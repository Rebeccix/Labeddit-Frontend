import { BrowserRouter, Routes, Route } from "react-router-dom"
import { LoginPage, SignupPage, PostsPage, CommentaryPage} from "../pages"

export const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route index element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="/posts" element={<PostsPage/>}/>
                <Route path="/commentary/:id" element={<CommentaryPage/>}/>
            </Routes>
        </BrowserRouter>
    )
}