import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';

export function onRouteDidUpdate() {
  if (ExecutionEnvironment.canUseDOM) {
    // Wait for navbar to render
    setTimeout(() => {
      const navbar = document.querySelector('.navbar__items--right');
      if (navbar && !document.getElementById('auth-buttons-container')) {
        const container = document.createElement('div');
        container.id = 'auth-buttons-container';
        container.style.cssText = 'display: flex; align-items: center; gap: 8px; margin-left: 12px;';
        
        // Import React and ReactDOM dynamically
        import('react').then(React => {
          import('react-dom/client').then(ReactDOM => {
            import('../contexts/AuthContext').then(({ useAuth }) => {
              import('@docusaurus/Link').then(({ default: Link }) => {
                
                function AuthButtons() {
                  const auth = useAuth();
                  
                  if (!auth || auth.loading) {
                    return null;
                  }
                  
                  const { user, logout } = auth;
                  
                  return user ? (
                    React.createElement('button', {
                      className: 'button button--secondary button--sm',
                      onClick: logout
                    }, 'Logout')
                  ) : (
                    React.createElement(React.Fragment, null,
                      React.createElement(Link, {
                        to: '/login',
                        className: 'button button--primary button--sm',
                        style: { marginRight: '8px' }
                      }, 'Login'),
                      React.createElement(Link, {
                        to: '/register',
                        className: 'button button--secondary button--sm'
                      }, 'Sign Up')
                    )
                  );
                }
                
                navbar.appendChild(container);
                const root = ReactDOM.createRoot(container);
                root.render(React.createElement(AuthButtons));
              });
            });
          });
        });
      }
    }, 100);
  }
}
