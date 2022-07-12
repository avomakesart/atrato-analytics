import {
  MobileNav,
  MobileNavLink,
  Nav,
  NavBar,
  NavBarBody,
  NavBrand,
  NavLink,
  NavMenuButton,
  NavProfile,
  Page,
  ThemeToggle,
} from '@atrato-analytics/ui';
import 'dayjs/locale/es';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import 'tailwindcss/tailwind.css';
import '../styles/custom.css';

function CustomApp({ Component, pageProps }: AppProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Atrato Dashboard</title>
      </Head>
      <Toaster />
      <NavBar>
        <NavBarBody>
          <NavBrand
            brandSource="/color-logo.png"
            brandAlt="logo"
            mobileBrandSource="/color-icon.png"
          />
          <Nav ml="auto">
            <NavLink href="/" isActive={router?.pathname === '/'}>
              Dashboard
            </NavLink>
          </Nav>

          <div className="flex items-center lg:border-l border-slate-200 ml-6 pl-6 dark:border-slate-800">
            <ThemeToggle panelClassName="-mt-4" />
            <NavProfile
              user={{
                name: 'Alvaro Castillo',
                email: 'alvaro.castillo777@gmail.com',
                imageUrl:
                  'https://lh3.googleusercontent.com/ogw/ADea4I6r0Azg8YG5i9uZRDhGNuKMheZMlg4BO3nQMJF7pds=s64-c-mo',
              }}
              navigation={[
                { name: 'Your Profile', href: '/' },
                { name: 'Settings', href: '/' },
                { name: 'Logout', href: '/' },
              ]}
            />
            <NavMenuButton
              isOpen={isMobileMenuOpen}
              onOpen={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </div>
        </NavBarBody>
        <MobileNav
          isOpen={isMobileMenuOpen}
          userNavigation={[
            { name: 'Your Profile', href: '/' },
            { name: 'Settings', href: '/' },
            { name: 'Logout', href: '/' },
          ]}
          user={{
            name: 'Alvaro Castillo',
            email: 'alvaro.castillo777@gmail.com',
            imageUrl:
              'https://lh3.googleusercontent.com/ogw/ADea4I6r0Azg8YG5i9uZRDhGNuKMheZMlg4BO3nQMJF7pds=s64-c-mo',
          }}
          navigation={[]}
        >
          <MobileNavLink href="/" isActive={router?.pathname === '/'}>
            Dashboard
          </MobileNavLink>
        </MobileNav>
      </NavBar>
      <Page>
        <Component {...pageProps} />
      </Page>
    </>
  );
}

export default CustomApp;
