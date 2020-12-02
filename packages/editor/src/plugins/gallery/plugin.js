import tinymce from 'tinymce/tinymce';

const global$1 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

const DOM = global$1.DOM;

const Utils = {
  isPlaceholderImage: isPlaceholderImage,
  mergeMargins: mergeMargins,
  addPixelSuffix: addPixelSuffix
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

const merge = baseMerge(shallow);

let editorInstance = null;

function addPixelSuffix(value) {
  if (value.length > 0 && /^[0-9]+$/.test(value)) {
    value += 'px';
  }
  return value;
}

function isPlaceholderImage(imgElm) {
  return imgElm.nodeName === 'IMG' && (imgElm.hasAttribute('data-mce-object') || imgElm.hasAttribute('data-mce-placeholder'));
}

function mergeMargins(css) {
  if (css.margin) {
    let splitMargin = String(css.margin).split(' ');
    switch (splitMargin.length) {
      case 1:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[0];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
        css['margin-left'] = css['margin-left'] || splitMargin[0];
        break;
      case 2:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
        css['margin-left'] = css['margin-left'] || splitMargin[1];
        break;
      case 3:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
        css['margin-left'] = css['margin-left'] || splitMargin[1];
        break;
      case 4:
        css['margin-top'] = css['margin-top'] || splitMargin[0];
        css['margin-right'] = css['margin-right'] || splitMargin[1];
        css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
        css['margin-left'] = css['margin-left'] || splitMargin[3];
    }
    delete css.margin;
  }
  return css;
}

function toImageData(data) {
  return {
    src: data.src.value,
    alt: data.alt,
    title: data.title,
    width: data.dimensions.width,
    height: data.dimensions.height,
    class: data.classes,
    style: data.style,
    caption: data.caption,
    hspace: data.hspace,
    vspace: data.vspace,
    border: data.border,
    borderStyle: data.borderstyle
  };
}

function insertOrUpdateImage(editor, data) {
  insertImageAtCaret(editor, data);
}

function updateProp(image, oldData, newData, name, set) {
  if (newData[name] !== oldData[name]) {
    set(image, name, newData[name]);
  }
}

function setAttrib(image, name, value) {
  image.setAttribute(name, value);
}

function getAttrib(image, name) {
  if (image.hasAttribute(name)) {
    return image.getAttribute(name);
  } else {
    return '';
  }
}

function getSize(image, name) {
  if (image.style[name]) {
    return Utils.removePixelSuffix(image.style[name]);
  } else {
    return getAttrib(image, name);
  }
}

function hasCaption(image) {
  return image.parentNode !== null && image.parentNode.nodeName === 'FIGURE';
}

function getHspace(image) {
  if (image.style.marginLeft && image.style.marginRight && image.style.marginLeft === image.style.marginRight) {
    return Utils.removePixelSuffix(image.style.marginLeft);
  } else {
    return '';
  }
}

function getVspace(image) {
  if (image.style.marginTop && image.style.marginBottom && image.style.marginTop === image.style.marginBottom) {
    return Utils.removePixelSuffix(image.style.marginTop);
  } else {
    return '';
  }
}

function getBorder(image) {
  if (image.style.borderWidth) {
    return Utils.removePixelSuffix(image.style.borderWidth);
  } else {
    return '';
  }
}

function getStyle(image, name) {
  return image.style[name] ? image.style[name] : '';
}

function read(normalizeCss, image) {
  return {
    src: getAttrib(image, 'src'),
    alt: getAttrib(image, 'alt'),
    title: getAttrib(image, 'title'),
    width: getSize(image, 'width'),
    height: getSize(image, 'height'),
    class: getAttrib(image, 'class'),
    style: normalizeCss(getAttrib(image, 'style')),
    caption: hasCaption(image),
    hspace: getHspace(image),
    vspace: getVspace(image),
    border: getBorder(image),
    borderStyle: getStyle(image, 'borderStyle')
  };
}

function wrapInFigure(image) {
  let figureElm = DOM.create('figure', { class: 'image' });
  DOM.insertAfter(figureElm, image);
  figureElm.appendChild(image);
  figureElm.appendChild(DOM.create('figcaption', { contentEditable: 'true' }, 'Caption'));
  figureElm.contentEditable = 'false';
}

function toggleCaption(image) {
  if (hasCaption(image)) {
    removeFigure(image);
  } else {
    wrapInFigure(image);
  }
}

function removeFigure(image) {
  let figureElm = image.parentNode;
  DOM.insertAfter(image, figureElm);
  DOM.remove(figureElm);
}

function normalized(set, normalizeCss) {
  return function(image, name, value) {
    set(image, value);
    normalizeStyle(image, normalizeCss);
  };
}

function normalizeStyle(image, normalizeCss) {
  let attrValue = image.getAttribute('style');
  let value = normalizeCss(attrValue !== null ? attrValue : '');
  if (value.length > 0) {
    image.setAttribute('style', value);
    image.setAttribute('data-mce-style', value);
  } else {
    image.removeAttribute('style');
  }
}

function setSize(name, normalizeCss) {
  return function(image, name, value) {
    if (image.style[name]) {
      image.style[name] = Utils.addPixelSuffix(value);
      normalizeStyle(image, normalizeCss);
    } else {
      setAttrib(image, name, value);
    }
  };
}

function write(normalizeCss, newData, image) {
  let oldData = read(normalizeCss, image);
  updateProp(image, oldData, newData, 'caption', function(image, _name, _value) {
    return toggleCaption(image);
  });
  updateProp(image, oldData, newData, 'src', setAttrib);
  updateProp(image, oldData, newData, 'alt', setAttrib);
  updateProp(image, oldData, newData, 'title', setAttrib);
  updateProp(image, oldData, newData, 'width', setSize('width', normalizeCss));
  updateProp(image, oldData, newData, 'height', setSize('height', normalizeCss));
  updateProp(image, oldData, newData, 'class', setAttrib);
  updateProp(image, oldData, newData, 'style', normalized(function(image, value) {
    return setAttrib(image, 'style', value);
  }, normalizeCss));
  updateProp(image, oldData, newData, 'hspace', normalized(setHspace, normalizeCss));
  updateProp(image, oldData, newData, 'vspace', normalized(setVspace, normalizeCss));
  updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
  updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
}

function setHspace(image, value) {
  let pxValue = Utils.addPixelSuffix(value);
  image.style.marginLeft = pxValue;
  image.style.marginRight = pxValue;
}

function setVspace(image, value) {
  let pxValue = Utils.addPixelSuffix(value);
  image.style.marginTop = pxValue;
  image.style.marginBottom = pxValue;
}

function setBorder(image, value) {
  image.style.borderWidth = Utils.addPixelSuffix(value);
}

function setBorderStyle(image, value) {
  image.style.borderStyle = value;
}

function shallow(old, nu) {
  return nu;
}

function baseMerge(merger) {
  return function() {
    let objects = new Array(arguments.length);
    for (let i = 0; i < objects.length; i++) {
      objects[i] = arguments[i];
    }
    if (objects.length === 0) {
      throw new Error('Can\'t merge zero objects');
    }
    let ret = {};
    for (let j = 0; j < objects.length; j++) {
      let curObject = objects[j];
      for (let key in curObject) {
        if (hasOwnProperty.call(curObject, key)) {
          ret[key] = merger(ret[key], curObject[key]);
        }
      }
    }
    return ret;
  };
}

function create(normalizeCss, data) {
  let image = window.document.createElement('img');
  write(normalizeCss, merge(data, { caption: false }), image);
  setAttrib(image, 'alt', data.alt);
  if (data.caption) {
    let figure = DOM.create('figure', { class: 'image' });
    figure.appendChild(image);
    figure.appendChild(DOM.create('figcaption', { contentEditable: 'true' }, 'Caption'));
    figure.contentEditable = 'false';
    return figure;
  } else {
    return image;
  }
}

function isFigure(elm) {
  return elm.nodeName === 'FIGURE';
}

function normalizeCss(editor, cssText) {
  let css = editor.dom.styles.parse(cssText);
  let mergedCss = Utils.mergeMargins(css);
  let compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
  return editor.dom.styles.serialize(compressed);
}

function insertImageAtCaret(editor, data) {
  let elm = create(function(css) {
    return normalizeCss(editor, css);
  }, data);
  editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
  editor.focus();
  editor.selection.setContent(elm.outerHTML);
  let insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
  editor.dom.setAttrib(insertedElm, 'data-mce-id', null);
  if (isFigure(insertedElm)) {
    let figure = splitTextBlock(editor, insertedElm);
    editor.selection.select(figure);
  } else {
    // editor.selection.select(insertedElm);
  }
}

function splitTextBlock(editor, figure) {
  let dom = editor.dom;
  let textBlock = dom.getParent(figure.parentNode, function(node) {
    return editor.schema.getTextBlockElements()[node.nodeName];
  }, editor.getBody());
  if (textBlock) {
    return dom.split(textBlock, figure);
  } else {
    return figure;
  }
}

export default {
  install: function(onGalleryButtonClick) {
    tinymce.PluginManager.add('gallery', function(editor, url) {
      editorInstance = editor;

      editor.ui.registry.addButton('gallery', {
        icon: 'image',
        onAction: onGalleryButtonClick
      });

      editor.ui.registry.addMenuItem('gallery', {
        icon: 'image',
        text: '图片库',
        onAction: onGalleryButtonClick
      });

      return {
        getMetadata: function() {
          return {
            name: 'gallery',
            url: ''
          };
        }
      };
    });
  },
  insertIntoEditor: function(images = []) {
    if (!editorInstance || images.length === 0) {
      return false;
    }

    for (let image of images.entries()) {
      editorInstance.undoManager.transact(function() {
        insertOrUpdateImage(editorInstance, toImageData(image[1]));
      });
      // editorInstance.editorUpload.uploadImagesAuto();
    }
  }
};
