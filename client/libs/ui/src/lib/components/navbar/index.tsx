import React, { Fragment } from 'react';
import { createContext, forwardRef, HTMLProps } from '../../utils';
import cn from 'clsx';
import { ExternalLink } from '../external-link';
import NextLink from 'next/link';
import Image, { StaticImageData } from 'next/image';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { CloseIcon, MenuIcon } from '../icons';

type NavBarProps = HTMLProps;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [NavBarProvider, useNavBarContext] = createContext<
  NavBarProps | undefined
>({
  name: 'NavBarContext',
  strict: false,
  errorMessage: 'You should wrap everything around the NavBar component.',
});

export const NavBar = forwardRef<NavBarProps, 'nav'>((props, ref) => {
  const { children, as: As, ...rest } = props;
  const Component = As || 'nav';
  return (
    <NavBarProvider value={undefined}>
      <div className="relative bg-white dark:bg-slate-800 dark:text-white">
        <Component className="max-w-full mx-auto px-4 sm:px-6" {...rest}>
          {children}
        </Component>
      </div>
    </NavBarProvider>
  );
});

interface NavBarBodyProps extends HTMLProps {
  justify?: 'start' | 'end' | 'center' | 'between' | 'evenly' | 'around';
}

export const NavBarBody = forwardRef<NavBarBodyProps, 'div'>((props, ref) => {
  const { className, justify = 'between', ...rest } = props;
  return (
    <div
      className={cn(
        `flex-1 flex border-b-2 border-gray-100 dark:border-slate-600 py-6 items-center justify-between sm:items-stretch sm:justify-${justify}`,
        className
      )}
      ref={ref}
      {...rest}
    />
  );
});

type StaticImport = string | StaticImageData;

interface NavBrandProps extends HTMLProps {
  /**
   * Source url for the brand logo.
   */
  brandSource?: StaticImport;
  /**
   * Alt attribute for accessibility
   */
  brandAlt?: string;
  /**
   * Source url for the brand mobile logo.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mobileBrandSource?: StaticImport | any;
  /**
   * if you don't want to use an img you should
   * use this prop to render some custom element
   * like, an svg, or any other component.
   */
  brandElement?: React.ReactNode;
  /**
   * if you don't want to use an img you should
   * use this prop to render some custom element
   * like, an svg, or any other component.
   */
  mobileBrandElement?: React.ReactNode;
}

export const NavBrand = forwardRef<NavBrandProps, 'div'>((props, ref) => {
  const {
    brandSource,
    brandAlt,
    mobileBrandSource,
    brandElement,
    mobileBrandElement,
    ...rest
  } = props;

  const renderBrandImage = () => {
    if (brandSource) {
      return (
        <>
          <span className="block cursor-pointer lg:hidden h-8 w-auto">
            <NextLink href="/">
              <Image
                src={mobileBrandSource}
                alt={brandAlt}
                width={32}
                height={32}
              />
            </NextLink>
          </span>
          <span className="hidden cursor-pointer lg:pl-3 lg:block h-8 w-auto">
            <NextLink href="/">
              <Image src={brandSource} alt={brandAlt} width={150} height={32} />
            </NextLink>
          </span>
        </>
      );
    }

    if (brandElement) {
      return (
        <>
          <span className="block lg:hidden h-8 w-auto">{brandElement}</span>
          <span className="hidden lg:block h-8 w-auto">
            {mobileBrandElement}
          </span>
        </>
      );
    }

    return;
  };

  return (
    <div className="flex-shrink-0 flex items-center" ref={ref} {...rest}>
      {renderBrandImage()}
    </div>
  );
});

interface NavProps extends HTMLProps {
  ml?: React.CSSProperties['marginLeft'];
  mr?: React.CSSProperties['marginRight'];
  mt?: React.CSSProperties['marginTop'];
  mb?: React.CSSProperties['marginBottom'];
  mx?: string;
  my?: string;
}

export const Nav = forwardRef<NavProps, 'div'>((props, ref) => {
  const { children, ml = 'auto', mr, mt, mb, mx, my, ...rest } = props;
  return (
    <div
      className={cn(
        {
          [`ml-${ml}`]: ml,
          [`mr-${mr}`]: mr,
          [`mt-${mt}`]: mt,
          [`mb-${mb}`]: mb,
          [`mx-${mx}`]: mx,
          [`my-${my}`]: my,
        },
        `${ml ? ml : 'ml-auto'} hidden md:block`
      )}
      ref={ref}
      {...rest}
    >
      <div className="flex space-x-4">{children}</div>
    </div>
  );
});

interface NavLink extends HTMLProps {
  href: string;
  children: React.ReactNode;
  isActive: boolean;
}

export const NavLink = forwardRef<NavLink, 'a'>((props, ref) => {
  const { isActive, children, href, className, ...rest } = props;

  const classes = cn(
    {
      'text-gray-400 dark:text-link-dark dark:border-link-dark font-bold':
        isActive,
    },
    { 'border-transparent': !isActive },
    'inline-flex w-full items-center justify-center text-base leading-9 px-3 py-0.5 hover:cursor-pointer whitespace-nowrap',
    className
  );

  if (href.startsWith('https://')) {
    return (
      <ExternalLink href={href} className={classes} ref={ref}>
        {children}
      </ExternalLink>
    );
  }

  return (
    <NextLink href={href} ref={ref}>
      <a className={classes} style={{ display: 'flex', justifyContent:'flex-start' }} {...rest}>
        {children}
      </a>
    </NextLink>
  );
});

type UserNav = {
  name: string;
  href: string;
};

type User = {
  name: string;
  email: string;
  imageUrl: string;
};

interface NavProfileProps extends HTMLProps {
  user: User;
  navigation: UserNav[];
}

export const NavProfile = forwardRef<NavProfileProps, 'div'>((props, ref) => {
  const { navigation, user, ...rest } = props;

  return (
    <div className="hidden md:pr-3 md:block" ref={ref} {...rest}>
      <div className="ml-4 flex items-center md:ml-6">
        {/* Profile dropdown */}
        <Menu as="div" className="ml-3 relative">
          <div>
            <Menu.Button className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
              <span className="sr-only">Open user menu</span>
              <img
                className="h-8 w-8 rounded-full"
                src={user.imageUrl}
                alt={user.name}
              />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
              {navigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }: { active: boolean }) => (
                    <a
                      href={item.href}
                      className={cn(
                        active ? 'bg-gray-100' : '',
                        'block px-4 py-2 text-sm text-gray-700'
                      )}
                    >
                      {item.name}
                    </a>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
});

interface NavMenuButtonProps extends HTMLProps {
  isOpen: boolean;
  onOpen: () => void;
}

export const NavMenuButton = forwardRef<NavMenuButtonProps, 'div'>(
  (props, ref) => {
    const { onOpen, isOpen, ...rest } = props;

    return (
      <Disclosure>
        <div className="ml-auto pl-4 flex md:hidden" {...rest} ref={ref}>
          {/* Mobile menu button */}
          <Disclosure.Button
            onClick={onOpen}
            className="bg-transparent inline-flex items-center justify-center p-2 rounded-md text-gray-800 dark:text-gray-200 dark:hover:bg-slate-700 hover:text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
          >
            <span className="sr-only">Open main menu</span>
            {isOpen ? (
              <CloseIcon className="block h-6 w-6" aria-hidden="true" />
            ) : (
              <MenuIcon className="block h-6 w-6" aria-hidden="true" />
            )}
          </Disclosure.Button>
        </div>
      </Disclosure>
    );
  }
);

interface MobileNavProps
  extends Omit<NavMenuButtonProps, 'onOpen'>,
    NavProfileProps {
  userNavigation: UserNav[];
}

export const MobileNav = forwardRef<MobileNavProps, 'div'>((props, ref) => {
  const { children, user, userNavigation, isOpen, ...rest } = props;

  return (
    <div
      className={`${
        isOpen ? 'block' : 'hidden'
      } absolute bg-white dark:bg-slate-800 z-20 left-0 right-0 md:hidden`}
      id="mobile-menu"
      ref={ref}
      {...rest}
    >
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">{children}</div>
      <div className="pt-4 pb-3 border-y border-gray-700 dark:border-slate-600">
        <div className="flex items-center px-5">
          <div className="flex-shrink-0">
            <img
              className="h-10 w-10 rounded-full"
              src={user.imageUrl}
              alt=""
            />
          </div>
          <div className="ml-3">
            <div className="text-base font-medium leading-none text-white">
              {user.name}
            </div>
            <div className="text-sm font-medium leading-none text-gray-400">
              {user.email}
            </div>
          </div>
        </div>
        <div className="mt-3 px-2 space-y-1">
          {userNavigation.map((_user, index) => (
            <React.Fragment key={index}>
              <NextLink href={_user.href} passHref>
                <a
                  href={_user.href}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  {_user.name}
                </a>
              </NextLink>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
});

type MobileNavLinkProps = NavLink;

export const MobileNavLink = forwardRef<MobileNavLinkProps, 'a'>(
  (props, ref) => {
    const { isActive, children, href, ...rest } = props;
    const classes = cn(
      {
        'flex w-full items-center justify-start text-gray-400 dark:text-link-dark dark:border-link-dark font-bold':
          isActive,
      },
      { 'border-transparent': !isActive },
      'inline-flex w-full items-center justify-start text-base leading-9 px-3 py-0.5 hover:cursor-pointer whitespace-nowrap'
    );

    return (
      <NavLink
        isActive={isActive}
        href={href}
        ref={ref}
        className={classes}
        {...rest}
      >
        {children}
      </NavLink>
    );
  }
);

interface NavMenuDividerProps extends HTMLProps {
  position?: 'l' | 'r' | 't' | 'b';
  width?: string;
  color?: string;
  colorWeight?: string;
}

export const NavMenuDivider = forwardRef<NavMenuDividerProps, 'div'>(
  (props, ref) => {
    const {
      position = 'l',
      width = '2',
      color = 'gray',
      colorWeight = '300',
      className,
      ...rest
    } = props;
    return (
      <div
        className={cn(
          `${
            position ? 'border-l-2' : `border-${position}-${width}`
          } border-${color}-${colorWeight}`,
          className
        )}
        ref={ref}
        {...rest}
      />
    );
  }
);
