import NextLink from 'next/link';


export function Link({ href, children, ...props }: any) {
  return (
    <NextLink href={href} {...props}>
      {children}
    </NextLink>
  );
}
