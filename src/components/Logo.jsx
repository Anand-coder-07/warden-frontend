const logoSources = {
  dark: '/warden-logo-dark.png',
  light: '/warden-logo-light.png',
}

function Logo({ variant = 'dark', height = 28 }) {
  return (
    <img
      src={logoSources[variant]}
      alt="WARDEN"
      height={height}
      style={{ width: 'auto', objectFit: 'contain', display: 'block' }}
      draggable="false"
    />
  )
}

export default Logo
