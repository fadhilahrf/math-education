import { Injectable } from '@angular/core';

declare global {
  interface Window {
    MathJax: any;
  }
}

@Injectable({
  providedIn: 'root'
})
export class MathJaxService {
  private mathJaxLoaded: Promise<void>;
    
  private mathJax: any = {
    source: 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js',
  }

  constructor() {
    this.mathJaxLoaded = this.loadMathJax()
      .then(() => {
        console.log('MathJax loaded');
      })
      .catch((err) => {
        console.log('MathJax failed to load', err);
      });
  }

  public getMathJaxLoadedPromise(): Promise<void> {
    return this.mathJaxLoaded;
  }

  public renderMathInDiv(divElement: HTMLElement) {
    window.MathJax = {
      ...window.MathJax,
      showMathMenu: false,
      tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
      menuSettings: { zoom: "Double-Click",zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    };

    if (this.mathJax) {
      console.log('Rendering MathJax in div...');
      this.mathJax.typesetPromise([divElement]).then(() => {
        console.log('MathJax rendering complete');
      }).catch((error: any) => {
        console.error('Error rendering MathJax:', error);
      });
    } else {
      console.error('MathJax is not loaded');
    }
  }

  private async loadMathJax(): Promise<any> {
    return new Promise((resolve, reject) => {
      console.log('loading MathJax');
      
      const script: HTMLScriptElement = document.createElement('script');
      script.type = 'text/javascript';
      script.src = this.mathJax.source;
      script.async = true;

      script.onload = () => {
        this.mathJax = window['MathJax'];
        resolve("MathJax loaded");
      };

      script.onerror = () => {
        reject("Error loading MathJax");
      }

      document.head.appendChild(script);
    });
  }

  render() {
    window.MathJax = {
      ...window.MathJax,
      showMathMenu: false,
      tex2jax: {inlineMath: [["$","$"],["\\(","\\)"]]},
      menuSettings: { zoom: "Double-Click",zscale: "150%" },
      CommonHTML: { linebreaks: { automatic: true } },
      "HTML-CSS": { linebreaks: { automatic: true } },
             SVG: { linebreaks: { automatic: true } }
    };

    window.MathJax.startup.promise.then(() => {
      window.MathJax.typesetPromise();
    });
  }
}
