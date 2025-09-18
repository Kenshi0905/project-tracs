import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

interface LaTeXFormulaProps {
  formula: string;
  inline?: boolean;
  className?: string;
}

export default function LaTeXFormula({ formula, inline = false, className = "" }: LaTeXFormulaProps) {
  const Component = inline ? InlineMath : BlockMath;
  
  return (
    <div className={`katex-formula ${className}`}>
      <Component math={formula} />
    </div>
  );
}