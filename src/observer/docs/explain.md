

### オブザーバーパターンとは？
以下のような形で、**処理を観察して、終了したことを検知する仕組みをクリーンにしたデザインパターン**。

observerはPublisherを見続ける。

赤枠が重要: この二つのモジュールを使用して実装をする。

![クラス図](https://github.com/Kota-Yamaguchi/ts-design-pattern/blob/main/src/observer/docs/pattern-class-daigram.svg)

以下の二つの方式が存在する。
- Publisherから通知くる形はPush型
- observerが監視し続ける方法がPull型
※今回はPush型で実装している。

### 処理をシーケンシャルに書くのはダメなのか？
[実装に関して](https://github.com/Kota-Yamaguchi/ts-design-pattern/blob/main/src/observer/docs/specification.md#%E5%AE%9F%E8%A3%85%E3%81%AE%E4%BB%95%E6%A7%98%E6%9B%B8)以下のようなコードはどうか？
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

<details>
<summary> いいの？悪いの？</summary>
これでもコードは動く。
しかし、Solidの原則を思い出してほしい。Clean Achitecuture的に考えると以下の原則に従っている方がいいとされる。

- 単一責任の原則
  - 責務を複数持っているクラスは、修正が入る可能性が高く知らないうちにバグを埋め込みやすくなる。
- OCの原則
  - 変更が入るごとに、バグを埋め込む可能性も増えます。
- リスコフの置換則
  - サブクラスに置き換えても全く同じ機能でないと、予期せぬバグが発生する可能性が高くなる。親クラスも子クラスも同じ方法で実行できるように一貫性を保とう。
- インターフェイス分離の原則
  - 使わないメソッドは分離したインターフェイスとして最低限だけ持たせることで、使わないメソッドを実行させる可能性を減らしバグを減らしたい。
- 依存関係逆転の原則
  - 実装の詳細は機能を実現するためのツールでしかない。ツールを使うクラスはツールではなくてそのインターフェイスに依存するべきである。ツール自体は置き換え可能であるべき。


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

このコードの書き方だとSOLIDには反した書き方になる。

- 関数の追加やクラスの置き換え(拡張)だけで、処理を変更できない。コードに修正が必要。(OCの原則に違反)
  - notifyからnotify2に変えたいときには、DFTにコードの変更をする必要がある。notify2の出力がvoidとは限らないので、DFTに大きく修正を加える可能性が出てくる。
- DFTクラスが具象メソッドに依存している。(依存関係逆転の原則)
  - notifyが冪等性がない場合はテストしにくい。テスト自体がNotifyと密結合している。
  - 具象クラスより、抽象クラスの方が安定している(変更の少ない)クラスなので、抽象クラスに依存している方が変更の影響を受けにくい
- DFTクラスが複数の責任の違う処理(計算と通知)をしている。(単一責任の原則に違反)


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

上記のコードはどうだろうか？
コードも短くていいような気がする。
ただこれでも問題となるのである。

- serviceクラスが具象メソッドに依存している。(依存関係逆転の原則)
  - notifyが冪等性がない場合はテストしにくい。テスト自体がNotifyと密結合している。
  - 具象クラスより、抽象クラスの方が安定している(変更の少ない)クラスなので、抽象クラスに依存している方が変更の影響を受けにくい



Observerパターンを使う理由には以下のモチベーションがある。
- 責務を分けたい
- コードに修正を加えたくない
- 抽象メソッドに依存したい。具象クラスの置き換えだけでロジックを修正したい
</details>

<details>
<summary> 使用例　</summary>

![使用例](https://github.com/Kota-Yamaguchi/ts-design-pattern/blob/main/src/observer/docs/examples.svg)

</details>
