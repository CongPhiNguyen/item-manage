// import { Suspense, useEffect, useState } from 'react'
// import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

// const basename = process.env.REACT_APP_BASENAME || '/game-v2'

// const AppRoutes = () => {
//   const { permission, loaded } = useRecoilValue(permissionState)
//   const [isLoading, setIsLoading] = useState(true)
//   useEffect(() => {
//     setIsLoading(false)
//   }, [])

//   if (isLoading) {
//     return <AppLoading />
//   }

//   const renderRoute = (route: IRoute) => {
//     const key = route.path

//     if (!loaded) {
//       return <Route key={key} path={route.path} element={<AppLoading />} />
//     }

//     const required = Array.isArray(route.permissions) ? route.permissions : []
//     if (required.length > 0 && !hasAnyPermission(required, permission)) {
//       return (
//         <Route key={key} path={route.path} element={<ErrorPage code={403} />} />
//       )
//     }

//     return <Route key={key} path={route.path} element={route.component} />
//   }

//   return (
//     <BrowserRouter basename={basename}>
//       <Suspense fallback={<AppLoading />}>
//         <Routes>
//           <Route path="/auth/login" element={<LoginPage />} />
//           <Route element={<DashboardLayout />}>
//             {routes.map((route) => renderRoute(route))}
//           </Route>
//           <Route path="*" element={<NotFound />} />
//           <Route path="/" element={<Navigate to="/vui-city/dashboard" />} />
//           <Route path="/change-password" element={<ChangePasswordPage />} />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   )
// }

// export default AppRoutes