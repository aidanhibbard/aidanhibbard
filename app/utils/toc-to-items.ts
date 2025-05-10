import type { Toc, TocLink } from '@nuxt/content';
import type { TreeItem } from '@nuxt/ui';

const processor = (links: TocLink[]): TreeItem[] => {
  return links.map((link) => {
    const item: TreeItem = {
      label: link.text,
      value: link.id
    };

    if (link.children && link.children.length) {
      item.children = processor(link.children);
    }

    return item;
  });
};

export default (toc: Toc): TreeItem[] => processor(toc.links);
