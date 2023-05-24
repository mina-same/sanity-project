import sanityClient from "@sanity/client";
import createImageUrlBuilder from '@sanity/image-url'

export const client = sanityClient({
  projectId: 'l0zfju8c',
  dataset: 'production',
  apiVersion: '2022-12-13',
  useCdn: true,
  token: 'skRoaN4wXQrJUGqDLBb6Yt7ViCWDsyL3uwDpjO0YWTjIaOjxxMMLE1OCnSJABomUpqBSAgX33a85X7UvGGJH280odY4fJAKzBJWOyFeVtU5BlIRibEyzFL6bi2oEkL1A6APKPzN0A26jSmY3llzrgVqJx3eIPfYiBNBLvm3AVhwjcVhHWyZp',
});

const builder = createImageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}
