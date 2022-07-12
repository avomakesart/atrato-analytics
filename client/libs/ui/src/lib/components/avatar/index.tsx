import * as React from 'react';
import { forwardRef } from '../../utils';
import cn from 'clsx';
import { ImageProps, useImage } from '../image';

interface AvatarOptions {
  /**
   * The name of the person in the avatar.
   *
   * - if `src` has loaded, the name will be used as the `alt` attribute of the `img`
   * - If `src` is not loaded, the name will be used to create the initials
   */
  name?: string;
  /**
   * If `true`, the `Avatar` will show a border around it.
   *
   * Best for a group of avatars
   */
  showBorder?: boolean;
  /**
   * The badge in the bottom right corner of the avatar.
   */
  children?: React.ReactNode;
  /**
   * The image url of the `Avatar`
   */
  src?: string;
  /**
   * List of sources to use for different screen resolutions
   */
  srcSet?: string;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * The border color of the avatar
   * @type React.CSSProperties["borderColor"]
   */
  borderColor?: React.CSSProperties['borderColor'];
  /**
   * The radius for the avatar
   */
  borderRadius?: React.CSSProperties['borderRadius'];
  /**
   * Function called when image failed to load
   */
  onError?: () => void;
  /**
   * The default avatar used as fallback when `name`, and `src`
   * is not specified.
   * @type React.ReactElement
   */
  icon?: React.ReactElement;
  /**
   * Function to get the initials to display
   */
  getInitials?: (name: string) => string;
  /**
   * Defining which referrer is sent when fetching the resource.
   * @type React.HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export type AvatarBadgeProps = React.HTMLAttributes<HTMLDivElement>;

/**
 * AvatarBadge used to show extra badge to the top-right
 * or bottom-right corner of an avatar.
 */
export const AvatarBadge = forwardRef<AvatarBadgeProps, 'div'>((props, ref) => {
  const badgeStyles: React.CSSProperties = {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    insetBlockEnd: '0',
    bottom: '0',
  };

  return (
    <div
      ref={ref}
      {...props}
      className={cn('atrato-avatar__badge', props.className)}
      style={badgeStyles}
    />
  );
});

function initials(name: string) {
  const [firstName, lastName] = name.split(' ');
  return firstName && lastName
    ? `${firstName.charAt(0)}${lastName.charAt(0)}`
    : firstName.charAt(0);
}

interface AvatarNameProps
  extends React.HTMLAttributes<HTMLDivElement>,
    Pick<AvatarOptions, 'name' | 'getInitials'> {}

/**
 * The avatar name container
 */
const AvatarName: React.FC<AvatarNameProps> = (props) => {
  const { name, getInitials, ...rest } = props;

  return (
    <div role="img" aria-label={name} {...rest}>
      {name ? getInitials?.(name) : null}
    </div>
  );
};

/**
 * Fallback avatar react component.
 * This should be a generic svg used to represent an avatar
 */
const DefaultIcon = React.memo<JSX.IntrinsicElements['svg']>((props) => (
  <svg
    viewBox="0 0 128 128"
    color="#fff"
    width="100%"
    height="100%"
    className="atrato-avatar__svg"
    {...props}
  >
    <path
      fill="currentColor"
      d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
    />
    <path
      fill="currentColor"
      d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
    />
  </svg>
));

export const baseStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  textTransform: 'uppercase',
  fontWeight: 'medium',
  position: 'relative',
  flexShrink: 0,
};

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onError'>,
    AvatarOptions {
  iconLabel?: string;
  /**
   * If `true`, opt out of the avatar's `fallback` logic and
   * renders the `img` at all times.
   */
  ignoreFallback?: boolean;
  /**
   * Size for the avatar
   */
  size?: string | number
    /**
   * Font size for the avatar initials
   */
     fontSize?: string | number
}

/**
 * Avatar component that renders an user avatar with
 * support for fallback avatar and name-only avatars
 */
export const Avatar = forwardRef<AvatarProps, 'span'>((props, ref) => {
  const {
    src,
    srcSet,
    name,
    showBorder,
    borderRadius = '9999px',
    onError,
    getInitials = initials,
    icon = <DefaultIcon />,
    iconLabel = ' avatar',
    loading,
    children,
    borderColor,
    ignoreFallback,
    fontSize,
    size,
    ...rest
  } = props;

  const avatarStyles: React.CSSProperties = {
    borderRadius,
    borderWidth: showBorder ? '2px' : undefined,
    fontSize: fontSize && fontSize || 'calc(1.2rem)',
  width: size,
  height: size,
    ...baseStyle,
  };

  if (borderColor) {
    avatarStyles.borderColor = borderColor;
  }

  return (
    <span
      ref={ref}
      {...rest}
      className={cn('rounded-full inline-flex items-center justify-center text-center uppercase font-medium relative shrink-0 bg-orange-1000 text-gray-800 border border-gray-100 align-top w-12 h-12', props.className)}
      style={avatarStyles}
    >
      <AvatarImage
        src={src}
        srcSet={srcSet}
        loading={loading}
        onError={onError}
        getInitials={getInitials}
        name={name}
        borderRadius={borderRadius}
        icon={icon}
        iconLabel={iconLabel}
        ignoreFallback={ignoreFallback}
      />
      {children}
    </span>
  );
});

interface AvatarImageProps
  extends ImageProps,
    Pick<AvatarProps, 'getInitials' | 'borderRadius' | 'icon' | 'name'> {
  iconLabel?: string;
}

const AvatarImage: React.FC<AvatarImageProps> = (props) => {
  const {
    src,
    srcSet,
    onError,
    getInitials,
    name,
    borderRadius,
    loading,
    iconLabel,
    icon = <DefaultIcon />,
    ignoreFallback,
    referrerPolicy,
  } = props;

  /**
   * use the image hook to only show the image when it has loaded
   */
  const status = useImage({ src, onError, ignoreFallback });

  const hasLoaded = status === 'loaded';

  /**
   * Fallback avatar applies under 2 conditions:
   * - If `src` was passed and the image has not loaded or failed to load
   * - If `src` wasn't passed
   *
   * In this case, we'll show either the name avatar or default avatar
   */
  const showFallback = !src || !hasLoaded;

  if (showFallback) {
    return name ? (
      <AvatarName
        className="atrato-avatar__initials"
        getInitials={getInitials}
        name={name}
      />
    ) : (
      React.cloneElement(icon, {
        role: 'img',
        'aria-label': iconLabel,
      })
    );
  }

  /**
   * If `src` was passed and the image has loaded, we'll show it
   */
  return (
    <img
      src={src}
      srcSet={srcSet}
      alt={name}
      referrerPolicy={referrerPolicy}
      className="atrato-avatar__img"
      loading={loading}
      style={{
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius,
      }}
    />
  );
};
