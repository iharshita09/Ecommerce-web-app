// // import React from 'react'
// import './Navbar.css'
// // import navlogo from '../Assets/nav-logo.svg'
// // import navprofileIcon from '../Assets/nav-profile.svg'
// import logo from '../Assets/logo.png'

// const Navbar = () => {
//   return (
//     <div className='navbar'>
//       {/* <img src={navlogo} className='nav-logo' alt="" /> */}
//       <img src={logo} alt="logo" />
//       <h1>TrendWaves co.</h1>
//       {/* <img src={navprofileIcon} className='nav-profile' alt="" /> */}
//     </div>
//   )
// }

// export default Navbar
import './Navbar.css'
// import logo from '../Assets/logo.png'
// import navprofileIcon from '../Assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {/* <img src={logo} className='nav-logo' alt="logo" /> */}
        <h1 className='nav-title'>TrendWaves co.</h1>
        {/* <img src={navprofileIcon} className='nav-profile' alt="" />  */}
      </div>
    </div>
  )
}

export default Navbar
