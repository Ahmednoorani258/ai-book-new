
declare module '@docusaurus/theme-classic' {
  export type NavbarItem = {
    readonly 'custom-auth-navbar-item': true;
  } & Record<string, unknown>;
}
