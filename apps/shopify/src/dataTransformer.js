import get from 'lodash/get';
import last from 'lodash/last';
import flatten from 'lodash/flatten';

/**
 * Transforms the API response of Shopify into
 * the product schema expected by the SkuPicker component
 */
export const dataTransformer = product => {
  const image = get(product, ['image', 'src'], '');
  const sku = get(product, ['id'], '');

  return {
    id: product.id,
    image,
    name: product.title,
    sku
  };
};

export const previewsToProducts = ({ apiEndpoint }) => ({ id, images, title }) => {
  const image = get(images, ['edges'], [])[0] || {}
  return {
    id,
    image: get(image, ['src'], ''),
    // TODO: Remove sku:id when shared-sku-app supports internal IDs
    // as an alternative piece of info to persist instead of the SKU.
    // For now this is a temporary hack.
    sku: id,
    productId: id,
    name: title,
    ...(apiEndpoint &&
      productId && {
        externalLink: `https://${apiEndpoint}${
          last(apiEndpoint) === '/' ? '' : '/'
        }admin/products/${id}`
      })
  };
};
