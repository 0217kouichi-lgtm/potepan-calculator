//計算式の表示部分
$(function () {
    $(".btn").on("click", function () {

        let currentText = $(".display").text();
        let btnText = $(this).text();
        let lastChar = currentText.slice(-1);
        let lastTwoChars = currentText.slice(-2);



        //ACボタンの挙動
        if ($(this).hasClass("allclear")) {
            $(".display").text("0");
            return;
        }
        //=ボタンの挙動
        if ($(this).hasClass("equal")) {

            let expression = $(".display").text();

            //式の最後が演算子やドットで終わっていたら処理を止める
            let lastChar = expression.slice(-1);
            if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/" || lastChar === ".") {
                return;
            }

            let result = eval(expression);
            $(".display").text(result);
            return;
        }

        //0ボタンの挙動
        if ($(this).hasClass("single-zero")) {
            // 最後の2文字が演算子と0の組み合わせになっていたら、何もせず終了する
            if (lastTwoChars === "+0" || lastTwoChars === "-0" || lastTwoChars === "*0" || lastTwoChars === "/0") {
                return;
            }
        }

        //00ボタンの挙動
        if ($(this).hasClass("double-zero")) {
            //0のみがディスプレイに表示されているときは、00を押しても0を表示する
            if (currentText === "0") {
                return;
            }

            //演算子の直後00が押されたら、00ではなく0を表示する
            if (lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
                $(".display").text(currentText + "0");
                return;
            }

            // 最後の2文字が演算子と0の組み合わせになっていたら、何もせず終了する
            if (lastTwoChars === "+0" || lastTwoChars === "-0" || lastTwoChars === "*0" || lastTwoChars === "/0") {
                return;
            }
        }
        //1~9ボタンの挙動
        if ($(this).hasClass("num")) {

            // 最後の2文字が演算子と0の組み合わせになっていて1~9のいずれかのボタンを押したら0を除いてそのボタンの数字を表示する
            if (lastTwoChars === "+0" || lastTwoChars === "-0" || lastTwoChars === "*0" || lastTwoChars === "/0") {
                $(".display").text(currentText.slice(0, -1) + btnText);
                return;
            }
        }


        //演算子やドットボタンの挙動
        if ($(this).hasClass("dot") || $(this).hasClass("operator")) {
            //二回連続で演算子やドットボタンが押せないようにする
            if (lastChar === "." || lastChar === "+" || lastChar === "-" || lastChar === "*" || lastChar === "/") {
                return;
            }

            //一つの数値にドットが二つ以上含まれないようにする処理

            if ($(this).hasClass("dot")) {
                let parts = currentText.split(/[\+\-\*\/]/);
                let currentNumber = parts[parts.length - 1];

                if (currentNumber.includes(".")) {
                    return;
                }
            }
        }
        //上記の条件以外のボタンの挙動

        if (currentText === "0") {
            if ($(this).hasClass("dot") || $(this).hasClass("operator")) {
                $(".display").text(currentText + btnText);
            }
            else {
                $(".display").text(btnText);
            }
        }
        else {
            $(".display").text(currentText + btnText);
        }

    });
});

