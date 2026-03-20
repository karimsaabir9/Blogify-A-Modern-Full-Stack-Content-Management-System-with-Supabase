import { Route, Routes } from 'react-router'
import HomePage from './pages/HomePages'
import ArticlePage from './pages/ArticlePage'
import ArticlesPage from './pages/ArticlesPage'
import SignInPage from './pages/SignInPage'
import SignUpPage from './pages/SignupPage'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import UnAuthenticatedRoute from './components/UnAuthenticatedRouter'
import ArticleEditorPage from './pages/ArticleEditorPage'
import ManageArticlesPage from './pages/ManageArticlesPage'
import ProtectedRoute from './components/ProtectedRoute'
import ProfilePage from './pages/ProfilePage'
import { Toaster } from 'react-hot-toast';
function App() {

  return (
    <AuthProvider>
      <div className=''>
        {/* header */}
        <Header />
        <main>
          {/* routes */}
          <Routes>

            {/* public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/articles' element={<ArticlesPage />} />
            <Route path='/article/:id' element={<ArticlePage />} />

            {/* unauthenticated routes (redirect to home if logged in) */}

            <Route path='/signin'
              element={
                <UnAuthenticatedRoute>
                  <SignInPage />
                </UnAuthenticatedRoute>
              } />

            <Route path='/signup'
              element={
                <UnAuthenticatedRoute>
                  <SignUpPage />
                </UnAuthenticatedRoute>
              }
            />


            {/* protected route */}

            <Route path='/editor'
              element={
                <ProtectedRoute>
                  <ArticleEditorPage />
                </ProtectedRoute>
              }
            />

            <Route path='/editor/:id'

              element={
                <ProtectedRoute>
                  <ArticleEditorPage />
                </ProtectedRoute>
              }

            />
            <Route path='/manage-articles'
              element={
                <ProtectedRoute>
                  <ManageArticlesPage />
                </ProtectedRoute>
              } />


            <Route path='/profile' element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
            />
          </Routes>
        </main>
        {/* footer */}
        <Footer />
      </div>

      <Toaster />
    </AuthProvider >
  )
}

export default App