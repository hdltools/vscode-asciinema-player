# Asciinema Player

이것은 [Asciinema]()로 녹화된 파일을 (`*.cast`) VS Code에서 재생시켜주는 extension입니다.  
단순히, VS Code의 Custom editor API를 이용하여 asciinema player를 통해 open된 `*.cast` 파일을 재생시켜 줍니다.
현재는 다른 어떠한 기능도 없습니다만, 점차 기능을 늘려나갈 예정입니다.

## 사용 방법
`*.cast` file을 VS Code로 열면, 텍스트 에디팅 pane 대신에 Asciinema player가 담긴 WebView가 열립니다.

## 개발
### 라이브러리 설치
npm을 이용해 라이브러리를 설치합니다.
```
$ npm install
```
### Debug
VSCode를 실행하고, `^F5`를 눌러서 디버거를 실행
### Package 생성 및 사용
* VSCE 설치  
[VSCE](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)는 VSCode extension package 프로그램으로, Global 설치를 권장하고 있습니다.  
아래 명령으로 global 설치가 가능합니다:
```
$ npm install -g vsce
``` 
`--save-dev`로 개발 패키지에 포함시킬 수도 있지만, VSCE 메뉴얼에 있는 가이드를 따릅니다.
* Package 생성  
vsce를 이용해 패키지 생성이 가능합니다:
```
$ vsce package
```
* Package 설치  
아직, market place에 올리지 않았으므로, 생성된 .vsix 파일을 이용해 설치합니다.



## References
* [Asciinema](https://asciinema.org)
* [Asciinema player](https://github.com/asciinema/asciinema-player)