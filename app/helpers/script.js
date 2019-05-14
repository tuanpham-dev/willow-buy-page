var engine = new window.Liquid({
  extname: '.liquid',
  cache: false,
  root: ['./liquid/templates/', './liquid/snippets/', './helpers/']
});

var src = `{% include 'template.liquid' %}`;

engine.registerFilter('asset_img_url', v => 'https://cdn.shopify.com/s/files/1/1595/8015/t/3/assets/' + v + '?15830');
engine.registerFilter('asset_img_url2', v =>  'assets/' + v);
engine.registerFilter('asset_url', v =>  'assets/' + v.replace('.liquid', ''));
engine.registerFilter('script_tag', v => '<script src="' + v + '"><\/script>');

engine.parseAndRender(src, ctx)
  .then(function (html) {
    jQuery(document.body).html(html);
  });
