## 実装の仕様書

### DFT計算が終わったことを通知してください。

1. DFT計算をするオブジェクトを作成する。計算はデタラメでもOK！
2. DFT計算を実行する。(5秒ぐらい止めて！)
3. DFTが終わったら、Consoleに計算結果を表示する。(通知する)


### 処理をシーケンスに書くのはダメなのか？
以下のようなコードはどうか？
``` typescript 
## main.ts
class service(){
    execute(){
        const dft = new DFT();
        const a = dft.execute();
        notify();
    }
}
notify(): void {
    console.log("calculated");
}
```

``` typescript 
## main.ts
class service(){
    execute(){
        const dft = new DFT();
        const a = dft.execute();

        
    }
}
notify(): void {
            console.log("calculated");
        }
class DFT {
    execute(): number {
        //計算処理
        notify()
        return result;
    }
}
```


これでもコードは動く。
しかし、Solidの原則を思い出してほしい。
- 単一責任の原則
- OCの原則
- リスコフの置換則
- インターフェイス分離の原則
- 依存関係逆転の原則

このコードの書き方だとSOLIDには反した書き方になる。
- 複数の責任の違う処理(計算と通知)をしている。(単一責任の原則に違反)
- 関数の追加やクラスの置き換え(拡張)だけで、処理を変更できない。コードに修正が必要。(OCの原則に違反)
- 具象メソッドに依存している(インターフェイス分離の原則)


Observerパターンを使う理由には以下のモチベーションがある。
- 責務を分けたい
- コードに修正を加えたくない
- 抽象メソッドに依存したい。具象クラスの置き換えだけでロジックを修正したい

### どんなときにObserverを使うのか？

