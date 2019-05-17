var engine = new window.Liquid({
  extname: '.liquid',
  cache: false,
  root: ['./liquid/templates/', './liquid/snippets/', './helpers/']
});

var src = `{% include 'template.liquid' %}`;

engine.registerFilter('asset_img_url', v => 'https://cdn.shopify.com/s/files/1/0063/2307/7180/t/39/assets/' + v + '?15830');
engine.registerFilter('asset_img_url_local', v =>  'assets/' + v);
engine.registerFilter('asset_url', v => 'https://cdn.shopify.com/s/files/1/0063/2307/7180/t/39/assets/' + v + '?15830');
engine.registerFilter('asset_url_local', v =>  'assets/' + v.replace('.liquid', ''));
engine.registerFilter('script_tag', v => '<script src="' + v + '"><\/script>');
engine.registerFilter('stylesheet_tag', v => '<link rel="stylesheet" type="text/css" href="' + v + '"><\/link>');

engine.parseAndRender(src, ctx)
  .then(function (html) {
    jQuery(document.body).html(html);
  });
