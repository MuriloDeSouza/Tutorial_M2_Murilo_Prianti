$(document).ready(function(){
    const escondecaixa = $(".hidden");
    const aparecebotao = $(".mostra_infos");
    const esconde = $(".esconde_infos");
    $(".mostra_infos").on("click", function(event) {
        escondecaixa.show();
        aparecebotao.hide();
        esconde.show();
});
$(".esconde_infos").on("click", function(event) {
    escondecaixa.hide();
    aparecebotao.show();
    esconde.hide();
});
});