/* eslint-disable jsx-a11y/alt-text */
import * as React from 'react';
import { forwardRef, omit, PropsOf } from '../../utils';
import {
  FallbackStrategy,
  shouldShowFallbackImage,
  useImage,
  UseImageProps,
} from './use-image';

interface NativeImageOptions {
  /**
   * The native HTML `width` attribute to the passed to the `img`
   */
  htmlWidth?: string | number;
  /**
   * The native HTML `height` attribute to the passed to the `img`
   */
  htmlHeight?: string | number;
}

interface NativeImageProps extends PropsOf<'img'>, NativeImageOptions {}

const NativeImage = React.forwardRef(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: NativeImageProps, ref: React.Ref<any>) => {
    const { htmlWidth, htmlHeight, alt, ...rest } = props;
    return (
      <img
        width={htmlWidth}
        height={htmlHeight}
        ref={ref}
        alt={alt}
        {...rest}
      />
    );
  }
);

interface ImageOptions extends NativeImageOptions {
  /**
   * Fallback image `src` to show if image is loading or image fails.
   *
   * Note 🚨: We recommend you use a local image
   */
  fallbackSrc?: string;
  /**
   * Fallback element to show if image is loading or image fails.
   * @type React.ReactElement
   */
  fallback?: React.ReactElement;
  /**
   * Defines loading strategy
   */
  loading?: 'eager' | 'lazy';
  /**
   * How the image to fit within its bounds.
   * It maps to css `object-fit` property.
   * @type React.CSSProperties["objectFit"]
   */
  fit?: React.CSSProperties['objectFit'];
  /**
   * How to align the image within its bounds.
   * It maps to css `object-position` property.
   * @type React.CSSProperties["objectPosition"]
   */
  align?: React.CSSProperties['objectPosition'];
  /**
   * If `true`, opt out of the `fallbackSrc` logic and use as `img`
   */
  ignoreFallback?: boolean;

  /**
   * - beforeLoadOrError(default): loads the fallbackImage while loading the src
   * - onError: loads the fallbackImage only if there is an error fetching the src
   *
   * @default "beforeLoadOrError"
   */
  fallbackStrategy?: FallbackStrategy;
  /**
   * Defining which referrer is sent when fetching the resource.
   * @type React.HTMLAttributeReferrerPolicy
   */
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
}

export interface ImageProps
  extends UseImageProps,
    Omit<React.HTMLAttributes<HTMLImageElement>, keyof UseImageProps>,
    ImageOptions {}

/**
 * React component that renders an image with support
 * for fallbacks
 *
 */
export const Image = forwardRef<ImageProps, 'img'>((props, ref) => {
  const {
    fallbackSrc,
    fallback,
    src,
    srcSet,
    align,
    fit,
    loading,
    ignoreFallback,
    crossOrigin,
    fallbackStrategy = 'beforeLoadOrError',
    referrerPolicy,
    ...rest
  } = props;

  const providedFallback = fallbackSrc !== undefined || fallback !== undefined;
  /**
   * Defer to native `img` tag if `loading` prop is passed
   *
   * shouldIgnoreFallbackImage determines if we have the possibility to render a fallback image
   */
  const shouldIgnoreFallbackImage =
    loading != null ||
    // use can opt out of fallback image
    ignoreFallback ||
    // if the user doesn't provide any kind of fallback we should ignore it
    !providedFallback;

  /**
   * returns `loaded` if fallback is ignored
   */
  const status = useImage({
    ...props,
    ignoreFallback: shouldIgnoreFallbackImage,
  });

  const showFallbackImage = shouldShowFallbackImage(status, fallbackStrategy);

  const shared = {
    ref,
    objectFit: fit,
    objectPosition: align,
    ...(shouldIgnoreFallbackImage ? rest : omit(rest, ['onError', 'onLoad'])),
  };

  if (showFallbackImage) {
    /**
     * If user passed a custom fallback component,
     * let's render it here.
     */
    if (fallback) return fallback;

    return (
      <img
        as={NativeImage}
        className="atrato-image__placeholder"
        src={fallbackSrc}
        {...shared}
      />
    );
  }

  return (
    <img
      as={NativeImage}
      src={src}
      srcSet={srcSet}
      crossOrigin={crossOrigin}
      loading={loading}
      referrerPolicy={referrerPolicy}
      className="atrato-image"
      {...shared}
    />
  );
});

export interface ImgProps
  extends React.HTMLAttributes<HTMLImageElement>,
    NativeImageOptions {}

/**
 * Fallback component for most SSR users who want to use the native `img`
 */
export const Img = forwardRef<ImgProps, 'img'>((props, ref) => (
  <img ref={ref} as={NativeImage} className="atrato-image" {...props} />
));
