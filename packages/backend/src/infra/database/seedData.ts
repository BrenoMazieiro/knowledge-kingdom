type SeedOption = { text: string; isCorrect: boolean };
type SeedQuestion = { text: string; difficulty: 'EASY' | 'MEDIUM' | 'HARD'; explanation: string; options: SeedOption[] };
type SeedContent = { title: string; type: string; body: string; description: string };
type SeedHouse = { name: string; description: string; isFree: boolean; entryPrice: number | null; contents: SeedContent[]; questions: SeedQuestion[] };
type SeedVillage = { name: string; description: string; houses: SeedHouse[] };
type SeedKingdom = { name: string; description: string; villages: SeedVillage[] };

const q = (text: string, difficulty: 'EASY' | 'MEDIUM' | 'HARD', explanation: string, correct: string, w1: string, w2: string, w3: string): SeedQuestion => ({
  text, difficulty, explanation,
  options: [{ text: correct, isCorrect: true }, { text: w1, isCorrect: false }, { text: w2, isCorrect: false }, { text: w3, isCorrect: false }],
});
const c = (title: string, type: string, body: string, desc: string): SeedContent => ({ title, type, body, description: desc });

export const players = [
  { email: 'alice@example.com', name: 'Alice Johnson', gameName: 'AliceTheWise' },
  { email: 'bob@example.com', name: 'Bob Smith', gameName: 'DragonSlayer99' },
  { email: 'carol@example.com', name: 'Carol Williams', gameName: 'QuantumKnight' },
  { email: 'david@example.com', name: 'David Brown', gameName: 'LogicMaster' },
  { email: 'eva@example.com', name: 'Eva Martinez', gameName: 'StarGazer42' },
  { email: 'frank@example.com', name: 'Frank Garcia', gameName: 'ByteWizard' },
  { email: 'grace@example.com', name: 'Grace Lee', gameName: 'PhiloSage' },
  { email: 'henry@example.com', name: 'Henry Wilson', gameName: 'AtomSmasher' },
  { email: 'iris@example.com', name: 'Iris Chen', gameName: 'CodeNinja77' },
  { email: 'jack@example.com', name: 'Jack Taylor', gameName: 'MathWhiz' },
  { email: 'kate@example.com', name: 'Kate Anderson', gameName: 'ChemQueen' },
  { email: 'leo@example.com', name: 'Leo Thomas', gameName: 'VectorLord' },
  { email: 'mia@example.com', name: 'Mia Jackson', gameName: 'NeuronSpark' },
  { email: 'noah@example.com', name: 'Noah White', gameName: 'TruthSeeker' },
  { email: 'olivia@example.com', name: 'Olivia Harris', gameName: 'PixelPioneer' },
  { email: 'peter@example.com', name: 'Peter Martin', gameName: 'GravityAce' },
  { email: 'quinn@example.com', name: 'Quinn Davis', gameName: 'SyntaxSamurai' },
  { email: 'rachel@example.com', name: 'Rachel Lopez', gameName: 'ElementalFury' },
  { email: 'sam@example.com', name: 'Sam Robinson', gameName: 'ProofHunter' },
  { email: 'tina@example.com', name: 'Tina Clark', gameName: 'DataDruid' },
  { email: 'umar@example.com', name: 'Umar Patel', gameName: 'WaveRider' },
  { email: 'vera@example.com', name: 'Vera Kim', gameName: 'LogicLynx' },
  { email: 'will@example.com', name: 'Will Turner', gameName: 'QuantumLeap' },
  { email: 'xena@example.com', name: 'Xena Costa', gameName: 'MoleMancer' },
  { email: 'yuri@example.com', name: 'Yuri Nakamura', gameName: 'InfinityEdge' },
  { email: 'zara@example.com', name: 'Zara Ahmed', gameName: 'PrimeHunter' },
  { email: 'andre@example.com', name: 'Andre Santos', gameName: 'BinaryBard' },
  { email: 'bianca@example.com', name: 'Bianca Rossi', gameName: 'EtherMage' },
  { email: 'carlos@example.com', name: 'Carlos Silva', gameName: 'AlgoKing' },
  { email: 'diana@example.com', name: 'Diana Wolf', gameName: 'PhotonFox' },
  { email: 'edgar@example.com', name: 'Edgar Reyes', gameName: 'MatrixMind' },
  { email: 'fiona@example.com', name: 'Fiona O\'Brien', gameName: 'CatalystX' },
  { email: 'gustavo@example.com', name: 'Gustavo Lima', gameName: 'EntropyKid' },
  { email: 'hana@example.com', name: 'Hana Tanaka', gameName: 'CircuitSage' },
  { email: 'ivan@example.com', name: 'Ivan Petrov', gameName: 'OrbitalAce' },
  { email: 'julia@example.com', name: 'Julia Fischer', gameName: 'SpectrumGirl' },
  { email: 'karim@example.com', name: 'Karim Hassan', gameName: 'TheoremTitan' },
  { email: 'luna@example.com', name: 'Luna Vargas', gameName: 'NebulaDancer' },
  { email: 'marco@example.com', name: 'Marco Bianchi', gameName: 'FractalKnight' },
  { email: 'nina@example.com', name: 'Nina Johansson', gameName: 'SynapseStorm' },
];

// ─── MATHEMATICS ─────────────────────────────────────────────

const mathematics: SeedKingdom = {
  name: 'Mathematics',
  description: 'The kingdom of numbers, patterns, logic, and abstract reasoning',
  villages: [
    {
      name: 'Algebra',
      description: 'Variables, equations, and abstract structures',
      houses: [
        {
          name: 'Linear Equations', description: 'Solving equations with one or more variables', isFree: true, entryPrice: null,
          contents: [
            c('Introduction to Linear Equations', 'ARTICLE', 'A linear equation has variables raised only to the first power. The standard form is ax + b = 0, where a and b are constants.', 'Learn the basics of linear equations'),
            c('Solving Linear Systems', 'ARTICLE', 'Systems of linear equations can be solved by substitution, elimination, or matrix methods. A consistent system has at least one solution.', 'Methods for solving systems'),
          ],
          questions: [
            q('What is the solution to 2x + 4 = 10?', 'EASY', 'Subtract 4: 2x = 6, divide by 2: x = 3', 'x = 3', 'x = 5', 'x = 7', 'x = 2'),
            q('Which represents a linear equation?', 'EASY', 'Linear equations have variables to the first power only', 'y = 3x + 2', 'y = x² + 1', 'y = 1/x', 'y = √x'),
            q('What is the slope of y = -2x + 5?', 'MEDIUM', 'In y = mx + b, m is the slope', '-2', '5', '2', '-5'),
            q('If 3x - 7 = 2x + 5, what is x?', 'MEDIUM', 'Subtract 2x: x - 7 = 5, add 7: x = 12', '12', '7', '-2', '5'),
            q('Solve: 3(2x - 1) + 4 = 2(x + 3) + 1', 'HARD', '6x - 3 + 4 = 2x + 7 → 4x = 6 → x = 3/2', 'x = 3/2', 'x = 2', 'x = 1', 'x = 5/4'),
          ],
        },
        {
          name: 'Polynomials', description: 'Expressions with multiple terms and powers', isFree: true, entryPrice: null,
          contents: [
            c('What Are Polynomials?', 'ARTICLE', 'A polynomial is an expression consisting of variables and coefficients combined using addition, subtraction, and multiplication. The degree is the highest power of the variable.', 'Introduction to polynomial expressions'),
            c('Factoring Polynomials', 'ARTICLE', 'Factoring rewrites a polynomial as a product of simpler polynomials. Common techniques include grouping, difference of squares, and the quadratic formula.', 'Learn polynomial factoring techniques'),
          ],
          questions: [
            q('What is the degree of 3x⁴ + 2x² - 1?', 'EASY', 'The degree is the highest exponent, which is 4', '4', '3', '2', '1'),
            q('What is (x + 2)(x - 2)?', 'EASY', 'This is a difference of squares: x² - 4', 'x² - 4', 'x² + 4', 'x² - 2', '2x'),
            q('Factor x² + 5x + 6', 'MEDIUM', 'Find two numbers that multiply to 6 and add to 5: 2 and 3', '(x + 2)(x + 3)', '(x + 1)(x + 6)', '(x - 2)(x - 3)', '(x + 2)(x - 3)'),
            q('What are the roots of x² - 9 = 0?', 'MEDIUM', 'Factor: (x-3)(x+3) = 0, so x = 3 or x = -3', 'x = 3 and x = -3', 'x = 9', 'x = 3 only', 'x = -9'),
            q('Divide x³ + 2x² - 5x - 6 by (x + 1)', 'HARD', 'Using synthetic division: quotient is x² + x - 6', 'x² + x - 6', 'x² + 3x - 6', 'x² - x + 6', 'x² + 2x - 5'),
          ],
        },
        {
          name: 'Matrices', description: 'Rectangular arrays of numbers and their operations', isFree: false, entryPrice: 100,
          contents: [
            c('Introduction to Matrices', 'ARTICLE', 'A matrix is a rectangular array of numbers arranged in rows and columns. Matrices are used in systems of equations, transformations, and computer graphics.', 'Learn matrix fundamentals'),
            c('Matrix Operations', 'ARTICLE', 'Matrices can be added, subtracted, and multiplied. Matrix multiplication is not commutative: AB ≠ BA in general.', 'Understanding matrix arithmetic'),
          ],
          questions: [
            q('What is the size of a matrix with 3 rows and 2 columns?', 'EASY', 'Matrix size is rows × columns', '3×2', '2×3', '6', '5'),
            q('What is the identity matrix property?', 'EASY', 'The identity matrix I satisfies AI = IA = A', 'AI = A for any compatible matrix A', 'It has all zeros', 'It equals any matrix', 'It has no inverse'),
            q('If A is 2×3 and B is 3×4, what size is AB?', 'MEDIUM', 'Result is rows of A × columns of B', '2×4', '3×3', '2×3', '3×4'),
            q('What is the determinant of [[1,2],[3,4]]?', 'MEDIUM', 'det = ad - bc = (1)(4) - (2)(3) = -2', '-2', '2', '10', '-10'),
            q('A matrix A is singular if:', 'HARD', 'A singular matrix has determinant 0 and no inverse', 'Its determinant is 0', 'Its determinant is 1', 'It is square', 'It has all positive entries'),
          ],
        },
        {
          name: 'Inequalities', description: 'Expressions comparing values with < > ≤ ≥', isFree: true, entryPrice: null,
          contents: [
            c('Understanding Inequalities', 'ARTICLE', 'An inequality states that two expressions are not equal, using symbols like <, >, ≤, ≥. Solutions are often ranges of values rather than single numbers.', 'Basics of mathematical inequalities'),
            c('Solving Compound Inequalities', 'ARTICLE', 'Compound inequalities combine two inequalities with AND or OR. When multiplying or dividing by a negative number, the inequality sign reverses.', 'Techniques for compound inequalities'),
          ],
          questions: [
            q('Solve: x + 3 > 7', 'EASY', 'Subtract 3 from both sides: x > 4', 'x > 4', 'x > 10', 'x < 4', 'x > 7'),
            q('What happens when you multiply an inequality by -1?', 'EASY', 'The direction of the inequality reverses', 'The inequality sign flips', 'Nothing changes', 'It becomes an equation', 'The solution is empty'),
            q('Solve: -2x + 6 ≤ 10', 'MEDIUM', 'Subtract 6: -2x ≤ 4, divide by -2 and flip: x ≥ -2', 'x ≥ -2', 'x ≤ -2', 'x ≥ 2', 'x ≤ 2'),
            q('Solve: |x - 3| < 5', 'MEDIUM', '|x-3| < 5 means -5 < x-3 < 5, so -2 < x < 8', '-2 < x < 8', 'x < 8', 'x > -2', 'x = 3'),
            q('Solve: x² - 4x - 5 > 0', 'HARD', 'Factor: (x-5)(x+1) > 0 → x < -1 or x > 5', 'x < -1 or x > 5', '-1 < x < 5', 'x > 5', 'x < -1'),
          ],
        },
        {
          name: 'Functions', description: 'Mappings between sets of numbers', isFree: false, entryPrice: 75,
          contents: [
            c('What Is a Function?', 'ARTICLE', 'A function assigns exactly one output to each input. Functions can be represented as equations, graphs, tables, or verbal descriptions.', 'Introduction to the concept of functions'),
            c('Domain and Range', 'ARTICLE', 'The domain is the set of all valid inputs and the range is the set of all outputs. Restrictions arise from division by zero or square roots of negatives.', 'Understanding function domains and ranges'),
          ],
          questions: [
            q('If f(x) = 2x + 1, what is f(3)?', 'EASY', 'f(3) = 2(3) + 1 = 7', '7', '6', '5', '9'),
            q('Which is NOT a function?', 'EASY', 'x² + y² = 1 is a circle, which fails the vertical line test', 'x² + y² = 1', 'y = x²', 'y = 2x + 3', 'y = |x|'),
            q('What is the domain of f(x) = 1/(x-2)?', 'MEDIUM', 'Division by zero when x = 2, so domain is all reals except 2', 'All real numbers except 2', 'All real numbers', 'x > 2', 'x ≠ 0'),
            q('If f(x) = x² and g(x) = x+1, what is f(g(x))?', 'MEDIUM', 'f(g(x)) = f(x+1) = (x+1)²', '(x + 1)²', 'x² + 1', 'x² + x + 1', '(x + 1)'),
            q('What is the inverse of f(x) = (2x + 3)/5?', 'HARD', 'Set y = (2x+3)/5, solve for x: 5y = 2x+3, x = (5y-3)/2', 'f⁻¹(x) = (5x - 3)/2', 'f⁻¹(x) = (5x + 3)/2', 'f⁻¹(x) = 5/(2x+3)', 'f⁻¹(x) = (2x - 3)/5'),
          ],
        },
      ],
    },
    {
      name: 'Calculus',
      description: 'Limits, derivatives, integrals, and infinite series',
      houses: [
        {
          name: 'Limits', description: 'The foundation of calculus — approaching values', isFree: true, entryPrice: null,
          contents: [
            c('Introduction to Limits', 'ARTICLE', 'A limit describes the value a function approaches as the input approaches a certain point. Limits are the foundation of both derivatives and integrals.', 'Understanding the limit concept'),
            c('Limit Laws and Techniques', 'ARTICLE', 'Limits can be evaluated using direct substitution, factoring, rationalization, or L\'Hôpital\'s rule for indeterminate forms like 0/0.', 'Techniques for evaluating limits'),
          ],
          questions: [
            q('What is lim(x→2) of 3x + 1?', 'EASY', 'Direct substitution: 3(2) + 1 = 7', '7', '6', '5', '8'),
            q('What does lim(x→a) f(x) = L mean?', 'EASY', 'f(x) gets arbitrarily close to L as x approaches a', 'f(x) approaches L as x approaches a', 'f(a) = L', 'f(x) = L for all x', 'f is continuous at a'),
            q('What is lim(x→0) sin(x)/x?', 'MEDIUM', 'This is a famous limit equal to 1, provable by the squeeze theorem', '1', '0', '∞', 'Does not exist'),
            q('Evaluate lim(x→3) (x²-9)/(x-3)', 'MEDIUM', 'Factor: (x-3)(x+3)/(x-3) = x+3, limit is 6', '6', '0', '3', 'Does not exist'),
            q('Evaluate lim(x→∞) (3x² + x)/(2x² - 1)', 'HARD', 'Divide by x²: (3 + 1/x)/(2 - 1/x²) → 3/2', '3/2', '3', '∞', '0'),
          ],
        },
        {
          name: 'Derivatives', description: 'Rates of change and tangent lines', isFree: true, entryPrice: null,
          contents: [
            c('The Derivative Concept', 'ARTICLE', 'The derivative measures the instantaneous rate of change of a function. Geometrically, it gives the slope of the tangent line at any point.', 'Understanding derivatives intuitively'),
            c('Differentiation Rules', 'ARTICLE', 'Key rules include the power rule, product rule, quotient rule, and chain rule. These allow us to differentiate complex expressions systematically.', 'Essential rules for computing derivatives'),
          ],
          questions: [
            q('What is the derivative of x³?', 'EASY', 'Power rule: d/dx(xⁿ) = nxⁿ⁻¹, so 3x²', '3x²', 'x²', '3x³', 'x³'),
            q('What is d/dx of a constant?', 'EASY', 'The derivative of any constant is zero', '0', '1', 'The constant itself', 'Undefined'),
            q('What is d/dx of sin(x)?', 'MEDIUM', 'The derivative of sin(x) is cos(x)', 'cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'),
            q('Using the product rule, d/dx[x·eˣ] = ?', 'MEDIUM', 'Product rule: eˣ + x·eˣ = eˣ(1 + x)', 'eˣ(1 + x)', 'x·eˣ', 'eˣ', '2x·eˣ'),
            q('What is d/dx of ln(sin(x))?', 'HARD', 'Chain rule: (1/sin(x))·cos(x) = cot(x)', 'cot(x)', 'tan(x)', '1/sin(x)', 'cos(x)/x'),
          ],
        },
        {
          name: 'Integrals', description: 'Accumulation of quantities and areas under curves', isFree: false, entryPrice: 100,
          contents: [
            c('Definite and Indefinite Integrals', 'ARTICLE', 'An indefinite integral finds a family of antiderivatives. A definite integral computes the net area between a curve and the x-axis over an interval.', 'Types of integrals and their meanings'),
            c('Integration Techniques', 'ARTICLE', 'Common techniques include substitution, integration by parts, partial fractions, and trigonometric substitution. Choosing the right method is key.', 'Methods for solving integrals'),
          ],
          questions: [
            q('What is ∫ 2x dx?', 'EASY', 'Power rule in reverse: x² + C', 'x² + C', '2x² + C', 'x + C', '2 + C'),
            q('What is ∫ 1 dx?', 'EASY', 'The integral of 1 with respect to x is x + C', 'x + C', '0', '1 + C', 'ln(x) + C'),
            q('Evaluate ∫₀¹ 3x² dx', 'MEDIUM', 'Antiderivative is x³, evaluate: 1³ - 0³ = 1', '1', '3', '1/3', '0'),
            q('What is ∫ eˣ dx?', 'MEDIUM', 'The exponential function is its own antiderivative', 'eˣ + C', 'xeˣ + C', 'eˣ⁺¹/(x+1) + C', 'ln(eˣ) + C'),
            q('Evaluate ∫ x·cos(x) dx using integration by parts', 'HARD', 'Let u=x, dv=cos(x)dx: x·sin(x) + cos(x) + C', 'x·sin(x) + cos(x) + C', 'x·cos(x) + sin(x) + C', '-x·sin(x) + cos(x) + C', 'x·sin(x) - cos(x) + C'),
          ],
        },
        {
          name: 'Series', description: 'Infinite sums and convergence', isFree: false, entryPrice: 150,
          contents: [
            c('Sequences and Series', 'ARTICLE', 'A series is the sum of the terms of a sequence. An infinite series converges if its partial sums approach a finite limit.', 'Introduction to sequences and series'),
            c('Convergence Tests', 'ARTICLE', 'Tests include the ratio test, root test, comparison test, and integral test. Each helps determine whether an infinite series converges or diverges.', 'How to test for convergence'),
          ],
          questions: [
            q('What is the sum of the geometric series 1 + 1/2 + 1/4 + ...?', 'EASY', 'Sum = a/(1-r) = 1/(1-0.5) = 2', '2', '1', '∞', '1.5'),
            q('A series converges if its partial sums:', 'EASY', 'Convergence means the partial sums approach a finite value', 'Approach a finite limit', 'Are always increasing', 'Are all positive', 'Equal zero'),
            q('What does the ratio test check?', 'MEDIUM', 'It examines lim |aₙ₊₁/aₙ|; if < 1, series converges', 'The limit of consecutive term ratios', 'The sum of all terms', 'Whether terms are positive', 'The first term'),
            q('What is the Taylor series of eˣ around x=0?', 'MEDIUM', 'eˣ = Σ xⁿ/n! for n=0 to ∞', '1 + x + x²/2! + x³/3! + ...', '1 + x + x² + x³ + ...', 'x + x²/2 + x³/3 + ...', '1 - x + x² - x³ + ...'),
            q('Does Σ(1/n) converge?', 'HARD', 'The harmonic series diverges, proven by comparison or integral test', 'No, it diverges', 'Yes, to 1', 'Yes, to ln(2)', 'Yes, to ∞'),
          ],
        },
        {
          name: 'Differential Equations', description: 'Equations involving functions and their derivatives', isFree: false, entryPrice: 200,
          contents: [
            c('What Are Differential Equations?', 'ARTICLE', 'A differential equation relates a function to its derivatives. They model growth, decay, oscillation, and many natural phenomena.', 'Introduction to differential equations'),
            c('Solving First-Order ODEs', 'ARTICLE', 'First-order ODEs can be solved by separation of variables, integrating factors, or exact equations. The general solution contains an arbitrary constant.', 'Techniques for first-order equations'),
          ],
          questions: [
            q('What is the order of dy/dx + y = x?', 'EASY', 'The order is the highest derivative present, which is first', 'First order', 'Second order', 'Zero order', 'Third order'),
            q('The solution to dy/dx = ky is:', 'EASY', 'This is exponential growth/decay: y = Ceᵏˣ', 'y = Ceᵏˣ', 'y = kx + C', 'y = k/x', 'y = sin(kx)'),
            q('Solve dy/dx = 2x with y(0) = 1', 'MEDIUM', 'Integrate: y = x² + C, apply IC: 1 = 0 + C, so y = x² + 1', 'y = x² + 1', 'y = 2x + 1', 'y = x²', 'y = 2x² + 1'),
            q('What type is y\'\' + y = 0?', 'MEDIUM', 'Second-order linear homogeneous with constant coefficients', 'Second-order linear homogeneous', 'First-order nonlinear', 'Second-order nonhomogeneous', 'Partial differential equation'),
            q('The general solution of y\'\' + y = 0 is:', 'HARD', 'Characteristic equation r²+1=0, r=±i, solution uses sin and cos', 'y = A·cos(x) + B·sin(x)', 'y = Aeˣ + Be⁻ˣ', 'y = (A + Bx)eˣ', 'y = A·cos(x)·eˣ'),
          ],
        },
      ],
    },
    {
      name: 'Geometry',
      description: 'Shapes, spaces, and spatial reasoning',
      houses: [
        {
          name: 'Euclidean Geometry', description: 'Classic plane geometry of points, lines, and angles', isFree: true, entryPrice: null,
          contents: [
            c('Foundations of Euclidean Geometry', 'ARTICLE', 'Euclidean geometry is based on five postulates, including the parallel postulate. It deals with flat surfaces and the relationships between points, lines, and angles.', 'The axiomatic foundation of geometry'),
            c('Triangles and Their Properties', 'ARTICLE', 'The angles of a triangle always sum to 180°. Key properties include congruence criteria (SSS, SAS, ASA) and the Pythagorean theorem for right triangles.', 'Essential triangle properties'),
          ],
          questions: [
            q('What is the sum of angles in a triangle?', 'EASY', 'A fundamental property of Euclidean geometry', '180°', '360°', '90°', '270°'),
            q('How many sides does a hexagon have?', 'EASY', 'Hex- means six', '6', '5', '7', '8'),
            q('In a right triangle with legs 3 and 4, the hypotenuse is:', 'MEDIUM', 'Pythagorean theorem: √(9+16) = √25 = 5', '5', '7', '6', '√7'),
            q('Two triangles are congruent by SAS if they share:', 'MEDIUM', 'SAS = two sides and the included angle are equal', 'Two sides and the included angle', 'Three angles', 'One side and two angles', 'Two sides and any angle'),
            q('The sum of interior angles of an n-sided polygon is:', 'HARD', 'Formula: (n-2) × 180°', '(n - 2) × 180°', 'n × 180°', '(n - 1) × 180°', 'n × 360°'),
          ],
        },
        {
          name: 'Trigonometry', description: 'Relationships between angles and sides of triangles', isFree: true, entryPrice: null,
          contents: [
            c('Trigonometric Ratios', 'ARTICLE', 'The three primary ratios are sine (opposite/hypotenuse), cosine (adjacent/hypotenuse), and tangent (opposite/adjacent). They relate angles to side lengths in right triangles.', 'The fundamental trig ratios'),
            c('The Unit Circle', 'ARTICLE', 'The unit circle defines trig functions for all angles. Key values occur at 0°, 30°, 45°, 60°, and 90° and extend to all four quadrants.', 'Using the unit circle for trig values'),
          ],
          questions: [
            q('What is sin(90°)?', 'EASY', 'On the unit circle, sin(90°) = 1', '1', '0', '-1', '1/2'),
            q('What is cos(0°)?', 'EASY', 'On the unit circle, cos(0°) = 1', '1', '0', '-1', '1/2'),
            q('What is tan(45°)?', 'MEDIUM', 'tan(45°) = sin(45°)/cos(45°) = 1', '1', '0', '√2', '1/√2'),
            q('The identity sin²θ + cos²θ equals:', 'MEDIUM', 'This is the Pythagorean identity, always true', '1', '0', 'sin(2θ)', 'tan²θ'),
            q('Express sin(A+B) using sum formula:', 'HARD', 'The sine addition formula', 'sin(A)cos(B) + cos(A)sin(B)', 'sin(A)sin(B) + cos(A)cos(B)', 'sin(A) + sin(B)', 'cos(A)sin(B) + sin(A)cos(B)'),
          ],
        },
        {
          name: 'Analytic Geometry', description: 'Geometry using coordinate systems', isFree: false, entryPrice: 80,
          contents: [
            c('The Cartesian Plane', 'ARTICLE', 'Analytic geometry combines algebra with geometry using coordinates. Points are represented as (x,y) pairs and shapes are described by equations.', 'Coordinate systems in geometry'),
            c('Equations of Conic Sections', 'ARTICLE', 'Conic sections — circles, ellipses, parabolas, and hyperbolas — arise from slicing a cone. Each has a standard equation form useful for graphing and analysis.', 'Understanding conic sections'),
          ],
          questions: [
            q('What is the distance between (0,0) and (3,4)?', 'EASY', 'Distance = √(9+16) = 5', '5', '7', '1', '√7'),
            q('The equation x² + y² = 9 represents:', 'EASY', 'Standard circle equation with center (0,0) and radius 3', 'A circle of radius 3', 'A line', 'A parabola', 'An ellipse'),
            q('What is the midpoint of (2,4) and (6,8)?', 'MEDIUM', 'Midpoint = ((2+6)/2, (4+8)/2) = (4,6)', '(4, 6)', '(8, 12)', '(3, 5)', '(4, 4)'),
            q('The equation y = x² is what type of curve?', 'MEDIUM', 'y = x² is the standard form of a parabola opening upward', 'Parabola', 'Circle', 'Hyperbola', 'Ellipse'),
            q('What is the eccentricity of a circle?', 'HARD', 'A circle is a special ellipse where both foci coincide, giving eccentricity 0', '0', '1', '1/2', '∞'),
          ],
        },
        {
          name: 'Solid Geometry', description: '3D shapes — volumes and surface areas', isFree: true, entryPrice: null,
          contents: [
            c('Three-Dimensional Shapes', 'ARTICLE', 'Solid geometry studies 3D objects like prisms, cylinders, cones, and spheres. Each has formulas for volume and surface area.', 'Overview of 3D geometric shapes'),
            c('Volume Formulas', 'ARTICLE', 'Volume measures the space inside a 3D object. Key formulas include V = lwh for rectangular prisms, V = πr²h for cylinders, and V = (4/3)πr³ for spheres.', 'Calculating volumes of solids'),
          ],
          questions: [
            q('What is the volume of a cube with side 3?', 'EASY', 'V = s³ = 27', '27', '9', '18', '12'),
            q('How many faces does a rectangular prism have?', 'EASY', 'A rectangular prism (box) has 6 faces', '6', '4', '8', '12'),
            q('What is the volume of a cylinder with r=2, h=5?', 'MEDIUM', 'V = πr²h = π(4)(5) = 20π', '20π', '10π', '40π', '25π'),
            q('The surface area of a sphere with radius r is:', 'MEDIUM', 'Surface area = 4πr²', '4πr²', '2πr²', 'πr²', '(4/3)πr³'),
            q('A cone has radius 3 and height 4. Its volume is:', 'HARD', 'V = (1/3)πr²h = (1/3)π(9)(4) = 12π', '12π', '36π', '9π', '16π'),
          ],
        },
        {
          name: 'Transformations', description: 'Translations, rotations, reflections, and dilations', isFree: false, entryPrice: 100,
          contents: [
            c('Geometric Transformations', 'ARTICLE', 'Transformations move or change geometric figures. Rigid transformations (translations, rotations, reflections) preserve size and shape; dilations change size.', 'Types of geometric transformations'),
            c('Symmetry and Transformations', 'ARTICLE', 'Symmetry occurs when a figure maps onto itself under a transformation. Rotational symmetry and line symmetry are the most common types.', 'Understanding symmetry through transformations'),
          ],
          questions: [
            q('A translation moves a figure without:', 'EASY', 'Translations slide figures preserving orientation and size', 'Rotating or resizing it', 'Moving it', 'Changing its position', 'Using coordinates'),
            q('A reflection over the x-axis changes (x,y) to:', 'EASY', 'The y-coordinate is negated', '(x, -y)', '(-x, y)', '(-x, -y)', '(y, x)'),
            q('A 90° counterclockwise rotation maps (x,y) to:', 'MEDIUM', 'Standard rotation formula', '(-y, x)', '(y, -x)', '(-x, -y)', '(x, -y)'),
            q('A dilation with scale factor 2 centered at origin maps (3,4) to:', 'MEDIUM', 'Multiply both coordinates by the scale factor', '(6, 8)', '(5, 6)', '(3, 4)', '(1.5, 2)'),
            q('Which transformation is NOT a rigid motion?', 'HARD', 'Rigid motions preserve distances; dilation changes size', 'Dilation', 'Translation', 'Rotation', 'Reflection'),
          ],
        },
      ],
    },
    {
      name: 'Statistics',
      description: 'Data analysis, probability, and inference',
      houses: [
        {
          name: 'Descriptive Statistics', description: 'Summarizing and visualizing data', isFree: true, entryPrice: null,
          contents: [
            c('Measures of Central Tendency', 'ARTICLE', 'Mean, median, and mode are the primary measures of center. The mean is the arithmetic average, the median is the middle value, and the mode is the most frequent value.', 'Understanding mean, median, and mode'),
            c('Measures of Spread', 'ARTICLE', 'Range, variance, and standard deviation measure how spread out data is. A small standard deviation means data points are close to the mean.', 'Quantifying data variability'),
          ],
          questions: [
            q('What is the mean of 2, 4, 6, 8?', 'EASY', 'Mean = (2+4+6+8)/4 = 5', '5', '4', '6', '20'),
            q('What is the median of 1, 3, 7, 8, 9?', 'EASY', 'The middle value of sorted data with 5 elements is the 3rd: 7', '7', '8', '3', '5.6'),
            q('The standard deviation is 0 when:', 'MEDIUM', 'Zero spread means all values are identical', 'All data values are the same', 'The mean is 0', 'There is one data point', 'Data is symmetric'),
            q('Which is most affected by outliers?', 'MEDIUM', 'The mean is pulled toward extreme values; median is resistant', 'Mean', 'Median', 'Mode', 'Range'),
            q('For a data set {2,3,3,4,5,5,5,7}, the mode is:', 'HARD', 'The mode is the value that appears most frequently: 5 appears 3 times', '5', '3', '4', '3 and 5'),
          ],
        },
        {
          name: 'Probability', description: 'The mathematics of chance and likelihood', isFree: true, entryPrice: null,
          contents: [
            c('Basic Probability', 'ARTICLE', 'Probability measures how likely an event is, ranging from 0 (impossible) to 1 (certain). For equally likely outcomes, P(A) = favorable outcomes / total outcomes.', 'Fundamentals of probability'),
            c('Conditional Probability', 'ARTICLE', 'Conditional probability P(A|B) is the probability of A given that B occurred. Bayes\' theorem relates P(A|B) to P(B|A), enabling powerful inference.', 'Understanding conditional probability'),
          ],
          questions: [
            q('What is the probability of rolling a 3 on a fair die?', 'EASY', '1 favorable outcome out of 6 equally likely', '1/6', '1/3', '1/2', '3/6'),
            q('If P(A) = 0.3 and P(B) = 0.5, and A, B independent, P(A and B) = ?', 'EASY', 'For independent events, P(A∩B) = P(A)·P(B)', '0.15', '0.8', '0.2', '0.35'),
            q('A coin is flipped 3 times. P(exactly 2 heads) = ?', 'MEDIUM', 'C(3,2)·(1/2)³ = 3/8', '3/8', '1/2', '1/4', '1/8'),
            q('P(A or B) for mutually exclusive events equals:', 'MEDIUM', 'If A and B cannot occur together: P(A∪B) = P(A) + P(B)', 'P(A) + P(B)', 'P(A) · P(B)', 'P(A) + P(B) - P(A∩B)', '1'),
            q('In Bayes\' theorem, what does P(B|A)·P(A)/P(B) equal?', 'HARD', 'Bayes\' theorem gives P(A|B)', 'P(A|B)', 'P(B|A)', 'P(A and B)', 'P(A) + P(B)'),
          ],
        },
        {
          name: 'Distributions', description: 'Probability distributions and their properties', isFree: false, entryPrice: 120,
          contents: [
            c('Normal Distribution', 'ARTICLE', 'The normal distribution is bell-shaped and symmetric around the mean. About 68% of data falls within one standard deviation, and 95% within two.', 'The bell curve and its properties'),
            c('Binomial Distribution', 'ARTICLE', 'The binomial distribution models the number of successes in n independent trials, each with probability p. Its mean is np and variance is np(1-p).', 'Modeling binary outcomes'),
          ],
          questions: [
            q('The normal distribution is symmetric about:', 'EASY', 'The bell curve is centered on the mean', 'The mean', 'The mode', 'Zero', 'The median only'),
            q('In a standard normal distribution, the mean is:', 'EASY', 'The standard normal has mean 0 and standard deviation 1', '0', '1', '-1', '0.5'),
            q('About what percent of data falls within 2 std dev of the mean?', 'MEDIUM', 'The empirical rule: 68-95-99.7', '95%', '68%', '99.7%', '50%'),
            q('The binomial distribution requires:', 'MEDIUM', 'Fixed n trials, each with same probability, independent', 'Fixed trials with constant probability', 'Continuous outcomes', 'Normal data', 'Large sample sizes'),
            q('For Bin(n=10, p=0.3), the expected value is:', 'HARD', 'E(X) = np = 10 × 0.3 = 3', '3', '0.3', '7', '30'),
          ],
        },
        {
          name: 'Hypothesis Testing', description: 'Making inferences from sample data', isFree: false, entryPrice: 150,
          contents: [
            c('Null and Alternative Hypotheses', 'ARTICLE', 'Hypothesis testing starts with a null hypothesis (H₀) representing no effect and an alternative hypothesis (H₁). We use sample data to decide whether to reject H₀.', 'Setting up hypothesis tests'),
            c('P-Values and Significance', 'ARTICLE', 'The p-value is the probability of observing data as extreme as ours if H₀ is true. If p-value < α (significance level), we reject H₀.', 'Interpreting statistical significance'),
          ],
          questions: [
            q('The null hypothesis typically states:', 'EASY', 'H₀ assumes no effect or no difference', 'There is no effect or difference', 'The treatment works', 'The sample is biased', 'The data is normal'),
            q('A p-value of 0.03 with α = 0.05 means:', 'EASY', 'Since 0.03 < 0.05, we reject H₀', 'Reject the null hypothesis', 'Fail to reject the null', 'Accept the null', 'The test is invalid'),
            q('A Type I error occurs when:', 'MEDIUM', 'Type I error = false positive = rejecting a true null', 'We reject a true null hypothesis', 'We fail to reject a false null', 'The sample is too small', 'The p-value is large'),
            q('What does a 95% confidence interval mean?', 'MEDIUM', '95% of such intervals constructed from repeated samples would contain the true parameter', '95% of intervals from repeated samples contain the true value', 'There is a 95% chance the true value is in this interval', 'The sample mean is 95% accurate', '95% of the data falls in this range'),
            q('Increasing sample size generally:', 'HARD', 'Larger n reduces standard error, giving more precise estimates and more power', 'Decreases the standard error', 'Increases the p-value', 'Increases Type I error rate', 'Has no effect on precision'),
          ],
        },
        {
          name: 'Regression', description: 'Modeling relationships between variables', isFree: true, entryPrice: null,
          contents: [
            c('Linear Regression', 'ARTICLE', 'Linear regression fits a line y = mx + b to data by minimizing the sum of squared residuals. The slope m indicates how y changes per unit change in x.', 'Fitting lines to data'),
            c('Correlation vs Causation', 'ARTICLE', 'The correlation coefficient r measures linear association strength (-1 to 1). However, correlation does not imply causation — confounding variables may exist.', 'Understanding correlation and its limits'),
          ],
          questions: [
            q('In y = mx + b, what does m represent?', 'EASY', 'The slope m is the rate of change', 'The slope (rate of change)', 'The y-intercept', 'The correlation', 'The residual'),
            q('r = 1 means:', 'EASY', 'A perfect positive linear relationship', 'Perfect positive linear correlation', 'No correlation', 'Perfect negative correlation', 'Causation'),
            q('The least squares method minimizes:', 'MEDIUM', 'It minimizes the sum of squared differences between observed and predicted values', 'Sum of squared residuals', 'Sum of residuals', 'Sum of absolute residuals', 'The correlation'),
            q('If r = -0.9, the relationship is:', 'MEDIUM', 'Strong negative: as x increases, y tends to decrease', 'Strong and negative', 'Weak and negative', 'Strong and positive', 'No relationship'),
            q('R² = 0.81 means:', 'HARD', 'R² is the proportion of variance in y explained by the model', '81% of variance in y is explained by the model', 'The correlation is 0.81', 'The slope is 0.81', '81% of predictions are correct'),
          ],
        },
      ],
    },
    {
      name: 'Number Theory',
      description: 'Properties of integers and prime numbers',
      houses: [
        {
          name: 'Prime Numbers', description: 'Numbers divisible only by 1 and themselves', isFree: true, entryPrice: null,
          contents: [
            c('What Are Prime Numbers?', 'ARTICLE', 'A prime number is a natural number greater than 1 with no positive divisors other than 1 and itself. The fundamental theorem of arithmetic states every integer > 1 is a unique product of primes.', 'The building blocks of integers'),
            c('Finding Primes', 'ARTICLE', 'The Sieve of Eratosthenes is an efficient algorithm to find all primes up to a given limit. It works by iteratively marking multiples of each prime as composite.', 'Algorithms for prime detection'),
          ],
          questions: [
            q('Is 1 a prime number?', 'EASY', 'By definition, primes are greater than 1', 'No', 'Yes', 'It depends', 'Only in some systems'),
            q('Which of these is prime?', 'EASY', '17 has no divisors other than 1 and 17', '17', '15', '21', '9'),
            q('How many prime numbers are even?', 'MEDIUM', 'Only 2 is even and prime; all other even numbers are divisible by 2', 'Exactly one (the number 2)', 'None', 'Infinitely many', 'Two'),
            q('The prime factorization of 60 is:', 'MEDIUM', '60 = 2² × 3 × 5', '2² × 3 × 5', '2 × 3 × 10', '4 × 15', '2 × 30'),
            q('Are there infinitely many primes?', 'HARD', 'Euclid proved this around 300 BC by contradiction', 'Yes, proven by Euclid', 'No, they become rarer', 'Unknown', 'Yes, but unproven'),
          ],
        },
        {
          name: 'Divisibility', description: 'Rules and properties of integer division', isFree: true, entryPrice: null,
          contents: [
            c('Divisibility Rules', 'ARTICLE', 'Divisibility rules provide quick checks: a number is divisible by 3 if its digit sum is divisible by 3, by 4 if its last two digits form a number divisible by 4.', 'Quick divisibility checks'),
            c('GCD and LCM', 'ARTICLE', 'The greatest common divisor (GCD) is the largest number dividing two integers. The least common multiple (LCM) is the smallest number both divide into. GCD × LCM = product of the two numbers.', 'Finding GCD and LCM'),
          ],
          questions: [
            q('Is 123 divisible by 3?', 'EASY', 'Digit sum: 1+2+3 = 6, which is divisible by 3', 'Yes', 'No', 'Only if divided by 9', 'Cannot determine'),
            q('What is the GCD of 12 and 18?', 'EASY', 'Factors of 12: {1,2,3,4,6,12}, of 18: {1,2,3,6,9,18}. GCD = 6', '6', '3', '12', '36'),
            q('What is the LCM of 4 and 6?', 'MEDIUM', 'Multiples of 4: 4,8,12... Multiples of 6: 6,12... LCM = 12', '12', '24', '2', '6'),
            q('If GCD(a,b) = 1, then a and b are:', 'MEDIUM', 'Numbers with GCD 1 share no common prime factors', 'Coprime (relatively prime)', 'Both prime', 'Equal', 'Consecutive'),
            q('Using the Euclidean algorithm, GCD(252, 105) = ?', 'HARD', '252 = 2×105 + 42, 105 = 2×42 + 21, 42 = 2×21 + 0. GCD = 21', '21', '7', '42', '3'),
          ],
        },
        {
          name: 'Modular Arithmetic', description: 'Arithmetic with remainders', isFree: false, entryPrice: 100,
          contents: [
            c('Introduction to Modular Arithmetic', 'ARTICLE', 'In modular arithmetic, numbers "wrap around" after reaching a modulus. We write a ≡ b (mod n) if n divides (a - b). It is fundamental to cryptography.', 'Clock arithmetic and remainders'),
            c('Properties of Congruences', 'ARTICLE', 'Congruences can be added, subtracted, and multiplied. If a ≡ b (mod n) and c ≡ d (mod n), then a+c ≡ b+d (mod n) and ac ≡ bd (mod n).', 'Rules for modular operations'),
          ],
          questions: [
            q('What is 17 mod 5?', 'EASY', '17 = 3×5 + 2, so the remainder is 2', '2', '3', '5', '12'),
            q('7 ≡ ? (mod 3)', 'EASY', '7 = 2×3 + 1, so 7 ≡ 1 (mod 3)', '1', '2', '0', '7'),
            q('If a ≡ 3 (mod 7) and b ≡ 5 (mod 7), then a+b ≡ ? (mod 7)', 'MEDIUM', '3 + 5 = 8, 8 mod 7 = 1', '1', '8', '0', '15'),
            q('What is 2⁵ mod 7?', 'MEDIUM', '2⁵ = 32, 32 = 4×7 + 4, so 32 mod 7 = 4', '4', '2', '5', '3'),
            q('By Fermat\'s Little Theorem, if p is prime and gcd(a,p)=1, then aᵖ⁻¹ ≡ ? (mod p)', 'HARD', 'Fermat\'s Little Theorem states aᵖ⁻¹ ≡ 1 (mod p)', '1', 'a', '0', 'p-1'),
          ],
        },
        {
          name: 'Cryptography Basics', description: 'Using number theory for secure communication', isFree: false, entryPrice: 150,
          contents: [
            c('Encryption Fundamentals', 'ARTICLE', 'Cryptography uses mathematical principles to secure information. Modern encryption relies on problems like factoring large numbers, which are computationally hard.', 'Mathematics behind secure communication'),
            c('RSA Algorithm Overview', 'ARTICLE', 'RSA encryption relies on the difficulty of factoring the product of two large primes. The public key encrypts data, and only the private key can decrypt it.', 'How RSA public-key encryption works'),
          ],
          questions: [
            q('RSA security is based on the difficulty of:', 'EASY', 'RSA relies on the factoring problem', 'Factoring large numbers', 'Solving linear equations', 'Computing square roots', 'Adding large numbers'),
            q('In RSA, the public key is used to:', 'EASY', 'Public key encrypts; private key decrypts', 'Encrypt messages', 'Decrypt messages', 'Generate primes', 'Sign documents only'),
            q('A Caesar cipher shifts each letter by:', 'MEDIUM', 'Caesar cipher is a simple substitution by fixed shift', 'A fixed number of positions', 'A random number each time', 'Its position in the alphabet', 'The message length'),
            q('In RSA, n = p × q where p and q are:', 'MEDIUM', 'RSA uses the product of two large primes', 'Large prime numbers', 'Any integers', 'Consecutive numbers', 'Powers of 2'),
            q('Euler\'s totient φ(15) equals:', 'HARD', 'φ(15) counts integers 1-14 coprime to 15. 15 = 3×5, φ(15) = 15(1-1/3)(1-1/5) = 8', '8', '14', '6', '4'),
          ],
        },
        {
          name: 'Sequences', description: 'Arithmetic, geometric, and special sequences', isFree: true, entryPrice: null,
          contents: [
            c('Arithmetic and Geometric Sequences', 'ARTICLE', 'An arithmetic sequence has a constant difference between terms. A geometric sequence has a constant ratio. Both have closed-form formulas for the nth term.', 'The two fundamental sequence types'),
            c('Famous Sequences', 'ARTICLE', 'The Fibonacci sequence (1,1,2,3,5,8,...) arises in nature and mathematics. Each term is the sum of the two preceding terms. Its ratio approaches the golden ratio φ ≈ 1.618.', 'Fibonacci and other notable sequences'),
          ],
          questions: [
            q('What is the next term in 2, 5, 8, 11, ...?', 'EASY', 'Common difference is 3, so next term is 14', '14', '13', '15', '12'),
            q('In a geometric sequence with first term 3 and ratio 2, the 4th term is:', 'EASY', 'a₄ = 3 × 2³ = 24', '24', '12', '48', '9'),
            q('The nth term of an arithmetic sequence is:', 'MEDIUM', 'aₙ = a₁ + (n-1)d', 'a₁ + (n-1)d', 'a₁ × rⁿ⁻¹', 'a₁ × n', 'a₁ + nd'),
            q('What is the 7th Fibonacci number? (Starting 1,1,2,...)', 'MEDIUM', '1,1,2,3,5,8,13 — the 7th is 13', '13', '8', '21', '11'),
            q('The sum of an infinite geometric series with |r|<1 is:', 'HARD', 'Sum = a/(1-r) when the series converges', 'a / (1 - r)', 'a × r', 'a / r', 'a(1 - rⁿ)/(1 - r)'),
          ],
        },
      ],
    },
  ],
};

// ─── CHEMISTRY ───────────────────────────────────────────────

const chemistry: SeedKingdom = {
  name: 'Chemistry',
  description: 'The kingdom of matter, reactions, and molecular structures',
  villages: [
    {
      name: 'General Chemistry',
      description: 'Atomic structure, bonding, and fundamental reactions',
      houses: [
        {
          name: 'Atomic Structure', description: 'Protons, neutrons, electrons, and electron configuration', isFree: true, entryPrice: null,
          contents: [
            c('The Atom', 'ARTICLE', 'Atoms consist of a nucleus (protons and neutrons) surrounded by electrons in orbitals. The atomic number defines the element, and the mass number is protons + neutrons.', 'Fundamental structure of atoms'),
            c('Electron Configuration', 'ARTICLE', 'Electrons fill orbitals following the Aufbau principle, Pauli exclusion principle, and Hund\'s rule. Configurations determine chemical behavior and bonding.', 'How electrons are arranged in atoms'),
          ],
          questions: [
            q('How many protons does carbon have?', 'EASY', 'Carbon has atomic number 6, meaning 6 protons', '6', '12', '8', '4'),
            q('What particle has no charge?', 'EASY', 'Neutrons are electrically neutral', 'Neutron', 'Proton', 'Electron', 'Photon'),
            q('The electron configuration of oxygen (Z=8) is:', 'MEDIUM', 'Fill 1s², 2s², then 2p⁴', '1s² 2s² 2p⁴', '1s² 2s² 2p⁶', '1s² 2s² 2p²', '1s² 2p⁶'),
            q('Isotopes differ in the number of:', 'MEDIUM', 'Isotopes have the same protons but different neutrons', 'Neutrons', 'Protons', 'Electrons', 'Quarks'),
            q('Which quantum number describes orbital shape?', 'HARD', 'The angular momentum quantum number l determines shape: s, p, d, f', 'Angular momentum (l)', 'Principal (n)', 'Magnetic (mₗ)', 'Spin (mₛ)'),
          ],
        },
        {
          name: 'Chemical Bonds', description: 'Ionic, covalent, and metallic bonding', isFree: true, entryPrice: null,
          contents: [
            c('Types of Chemical Bonds', 'ARTICLE', 'Ionic bonds form by electron transfer between metals and nonmetals. Covalent bonds share electrons between nonmetals. Metallic bonds delocalize electrons in metals.', 'The three main bond types'),
            c('Electronegativity and Polarity', 'ARTICLE', 'Electronegativity measures an atom\'s ability to attract electrons. A large difference creates ionic bonds; a small difference creates polar covalent bonds.', 'How electronegativity affects bonding'),
          ],
          questions: [
            q('NaCl is an example of which bond type?', 'EASY', 'Sodium (metal) transfers an electron to chlorine (nonmetal)', 'Ionic', 'Covalent', 'Metallic', 'Hydrogen'),
            q('In a covalent bond, electrons are:', 'EASY', 'Covalent bonds involve sharing electrons', 'Shared between atoms', 'Transferred completely', 'Delocalized', 'Destroyed'),
            q('Which element is most electronegative?', 'MEDIUM', 'Fluorine has the highest electronegativity (3.98)', 'Fluorine', 'Oxygen', 'Chlorine', 'Nitrogen'),
            q('A polar covalent bond has:', 'MEDIUM', 'Unequal sharing creates partial charges', 'Unequal electron sharing', 'Equal electron sharing', 'Complete electron transfer', 'No electrons'),
            q('How many covalent bonds does nitrogen typically form?', 'HARD', 'Nitrogen has 5 valence electrons, needs 3 more for an octet', '3', '2', '5', '4'),
          ],
        },
        {
          name: 'States of Matter', description: 'Solids, liquids, gases, and phase changes', isFree: false, entryPrice: 75,
          contents: [
            c('Phases of Matter', 'ARTICLE', 'Matter exists as solid (fixed shape and volume), liquid (fixed volume, variable shape), or gas (variable shape and volume). Phase transitions occur at specific temperatures.', 'The three common states of matter'),
            c('Ideal Gas Law', 'ARTICLE', 'The ideal gas law PV = nRT relates pressure, volume, amount, and temperature. Real gases deviate at high pressures and low temperatures.', 'Modeling gas behavior mathematically'),
          ],
          questions: [
            q('In which state are particles most tightly packed?', 'EASY', 'Solids have particles in fixed, closely packed positions', 'Solid', 'Liquid', 'Gas', 'Plasma'),
            q('What is the boiling point of water at 1 atm?', 'EASY', 'Water boils at 100°C (212°F) at standard pressure', '100°C', '0°C', '50°C', '212°C'),
            q('In PV = nRT, R is:', 'MEDIUM', 'R is the universal gas constant, approximately 8.314 J/(mol·K)', 'The gas constant', 'The reaction rate', 'The radius', 'The resistance'),
            q('Sublimation is the transition from:', 'MEDIUM', 'Sublimation goes directly from solid to gas (e.g., dry ice)', 'Solid to gas', 'Liquid to gas', 'Gas to solid', 'Solid to liquid'),
            q('At STP, one mole of an ideal gas occupies:', 'HARD', 'Standard Temperature and Pressure: 0°C, 1 atm → 22.4 L', '22.4 L', '11.2 L', '1 L', '44.8 L'),
          ],
        },
        {
          name: 'Solutions', description: 'Mixtures, solubility, and concentration', isFree: true, entryPrice: null,
          contents: [
            c('Types of Solutions', 'ARTICLE', 'A solution is a homogeneous mixture of a solute dissolved in a solvent. Concentration can be measured as molarity (mol/L), mass percent, or parts per million.', 'Understanding solutions and concentration'),
            c('Solubility Factors', 'ARTICLE', 'Solubility depends on temperature, pressure (for gases), and the nature of solute and solvent. "Like dissolves like" — polar solvents dissolve polar solutes.', 'What affects how well substances dissolve'),
          ],
          questions: [
            q('What is the solvent in salt water?', 'EASY', 'The solvent is the substance present in greater amount', 'Water', 'Salt', 'Both equally', 'Neither'),
            q('Molarity is measured in:', 'EASY', 'Molarity (M) = moles of solute per liter of solution', 'mol/L', 'g/L', 'L/mol', 'g/mol'),
            q('A 2M NaCl solution contains how many moles per liter?', 'MEDIUM', '2M means 2 moles per liter', '2', '1', '0.2', '20'),
            q('Increasing temperature generally does what to solid solubility?', 'MEDIUM', 'Most solid solutes dissolve more at higher temperatures', 'Increases it', 'Decreases it', 'No effect', 'Depends on pressure'),
            q('A saturated solution at a given temperature:', 'HARD', 'No more solute can dissolve; it is at maximum capacity', 'Contains the maximum amount of dissolved solute', 'Has no more solvent', 'Is always concentrated', 'Will always precipitate'),
          ],
        },
        {
          name: 'Chemical Reactions', description: 'Balancing equations and reaction types', isFree: false, entryPrice: 100,
          contents: [
            c('Balancing Chemical Equations', 'ARTICLE', 'Chemical equations must be balanced to satisfy conservation of mass. The same number of each type of atom must appear on both sides of the equation.', 'How to balance chemical equations'),
            c('Types of Reactions', 'ARTICLE', 'Common reaction types include synthesis (A + B → AB), decomposition (AB → A + B), single replacement, double replacement, and combustion.', 'Classifying chemical reactions'),
          ],
          questions: [
            q('In a balanced equation, what is conserved?', 'EASY', 'Conservation of mass: atoms are neither created nor destroyed', 'Mass (number of each atom)', 'Volume', 'Temperature', 'Color'),
            q('2H₂ + O₂ → 2H₂O is what type of reaction?', 'EASY', 'Two reactants combine to form one product', 'Synthesis', 'Decomposition', 'Single replacement', 'Combustion'),
            q('Balance: _Fe + _O₂ → _Fe₂O₃', 'MEDIUM', '4Fe + 3O₂ → 2Fe₂O₃', '4, 3, 2', '2, 3, 1', '1, 1, 1', '2, 1, 2'),
            q('In a combustion reaction, a hydrocarbon reacts with:', 'MEDIUM', 'Combustion is rapid reaction with oxygen producing CO₂ and H₂O', 'Oxygen', 'Nitrogen', 'Hydrogen', 'Water'),
            q('What is the oxidation state of Mn in KMnO₄?', 'HARD', 'K = +1, O = -2 each (×4 = -8). +1 + Mn + (-8) = 0, so Mn = +7', '+7', '+4', '+5', '+2'),
          ],
        },
      ],
    },
    {
      name: 'Organic Chemistry',
      description: 'Carbon-based compounds and their reactions',
      houses: [
        {
          name: 'Hydrocarbons', description: 'Alkanes, alkenes, alkynes, and aromatic compounds', isFree: true, entryPrice: null,
          contents: [
            c('Types of Hydrocarbons', 'ARTICLE', 'Hydrocarbons contain only carbon and hydrogen. Alkanes have single bonds, alkenes have double bonds, alkynes have triple bonds, and aromatics have ring structures.', 'The fundamental organic compound classes'),
            c('Naming Hydrocarbons', 'ARTICLE', 'IUPAC nomenclature uses prefixes (meth-, eth-, prop-, but-) for chain length and suffixes (-ane, -ene, -yne) for bond type. Numbering starts from the end nearest the functional group.', 'Systematic naming of organic compounds'),
          ],
          questions: [
            q('What is the simplest alkane?', 'EASY', 'Methane (CH₄) has one carbon atom', 'Methane (CH₄)', 'Ethane (C₂H₆)', 'Propane (C₃H₈)', 'Ethylene (C₂H₄)'),
            q('Alkenes contain what type of bond?', 'EASY', 'Alkenes have at least one carbon-carbon double bond', 'Double bond', 'Triple bond', 'Single bonds only', 'Ionic bond'),
            q('The general formula for alkanes is:', 'MEDIUM', 'Each carbon forms 4 bonds; for n carbons: CₙH₂ₙ₊₂', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙHₙ', 'CₙH₂ₙ₋₂'),
            q('Benzene (C₆H₆) is classified as:', 'MEDIUM', 'Benzene has a ring of 6 carbons with delocalized electrons', 'Aromatic', 'Alkene', 'Alkyne', 'Cycloalkane'),
            q('How many structural isomers does butane (C₄H₁₀) have?', 'HARD', 'n-butane and isobutane (2-methylpropane)', '2', '1', '3', '4'),
          ],
        },
        {
          name: 'Functional Groups', description: 'Alcohols, aldehydes, ketones, carboxylic acids, and more', isFree: false, entryPrice: 100,
          contents: [
            c('Common Functional Groups', 'ARTICLE', 'Functional groups are atom groups that give molecules characteristic properties. Major groups include hydroxyl (-OH), carbonyl (C=O), carboxyl (-COOH), and amino (-NH₂).', 'The reactive parts of organic molecules'),
            c('Naming with Functional Groups', 'ARTICLE', 'Functional groups determine the suffix in IUPAC naming: -ol for alcohols, -al for aldehydes, -one for ketones, -oic acid for carboxylic acids, and -amine for amines.', 'Nomenclature rules for functional groups'),
          ],
          questions: [
            q('The -OH functional group identifies:', 'EASY', 'The hydroxyl group defines alcohols', 'An alcohol', 'An aldehyde', 'A ketone', 'An amine'),
            q('Acetic acid (vinegar) contains which functional group?', 'EASY', 'Acetic acid is CH₃COOH, a carboxylic acid', 'Carboxyl (-COOH)', 'Hydroxyl (-OH)', 'Carbonyl (C=O)', 'Amino (-NH₂)'),
            q('A ketone has a carbonyl group bonded to:', 'MEDIUM', 'Ketones have C=O between two carbon groups', 'Two carbon groups', 'A hydrogen and carbon', 'Two hydrogens', 'An oxygen and hydrogen'),
            q('Ethanol\'s IUPAC name suffix is:', 'MEDIUM', 'Alcohols use the -ol suffix', '-ol', '-al', '-one', '-ane'),
            q('An ester is formed from the reaction of:', 'HARD', 'Esterification combines an acid and alcohol, releasing water', 'A carboxylic acid and an alcohol', 'Two alcohols', 'An aldehyde and a ketone', 'An amine and an acid'),
          ],
        },
        {
          name: 'Organic Reactions', description: 'Substitution, elimination, and addition reactions', isFree: true, entryPrice: null,
          contents: [
            c('Reaction Mechanisms', 'ARTICLE', 'Organic reactions follow specific mechanisms. Substitution replaces one group with another, addition adds atoms across a double bond, and elimination removes atoms to form a double bond.', 'How organic reactions proceed step by step'),
            c('SN1 and SN2 Reactions', 'ARTICLE', 'SN2 is a one-step mechanism with backside attack, favored by primary substrates. SN1 proceeds through a carbocation intermediate, favored by tertiary substrates.', 'Nucleophilic substitution mechanisms'),
          ],
          questions: [
            q('Addition reactions occur across:', 'EASY', 'Addition reactions break a pi bond and add atoms', 'Double or triple bonds', 'Single bonds only', 'Aromatic rings', 'Any bond'),
            q('In a substitution reaction, a leaving group is replaced by:', 'EASY', 'A nucleophile replaces the leaving group', 'A nucleophile', 'An electrophile', 'A radical', 'A proton'),
            q('SN2 reactions prefer which substrate type?', 'MEDIUM', 'SN2 needs backside access, so less steric hindrance is better', 'Primary (less hindered)', 'Tertiary', 'Aromatic', 'Quaternary'),
            q('Markovnikov\'s rule for HBr addition to propene predicts:', 'MEDIUM', 'H adds to the carbon with more H atoms; Br to the more substituted carbon', 'Br on the more substituted carbon', 'Br on the less substituted carbon', 'Equal distribution', 'No reaction'),
            q('E2 elimination requires:', 'HARD', 'E2 is a one-step mechanism needing a strong base and anti-periplanar geometry', 'A strong base and anti-periplanar H and leaving group', 'A weak base', 'A polar protic solvent only', 'A carbocation intermediate'),
          ],
        },
        {
          name: 'Polymers', description: 'Macromolecules formed from repeating units', isFree: false, entryPrice: 80,
          contents: [
            c('Addition and Condensation Polymers', 'ARTICLE', 'Addition polymers (like polyethylene) form by joining monomers with double bonds. Condensation polymers (like nylon) form by removing small molecules like water between monomers.', 'The two main polymerization mechanisms'),
            c('Common Polymers', 'ARTICLE', 'Polyethylene is used in bags and containers, PVC in pipes, polystyrene in packaging, and nylon in textiles. Each polymer\'s properties depend on its monomer structure.', 'Important polymers and their uses'),
          ],
          questions: [
            q('Polyethylene is made from which monomer?', 'EASY', 'Ethylene (ethene, CH₂=CH₂) polymerizes to form polyethylene', 'Ethylene', 'Propylene', 'Styrene', 'Vinyl chloride'),
            q('A polymer is a large molecule made of:', 'EASY', 'Polymers consist of many repeated monomer units', 'Repeating monomer units', 'A single large atom', 'Metal atoms', 'Ionic bonds'),
            q('Condensation polymerization produces a polymer and:', 'MEDIUM', 'A small molecule (usually water) is released in each step', 'A small molecule like water', 'Heat only', 'Free radicals', 'Carbon dioxide'),
            q('Nylon is an example of:', 'MEDIUM', 'Nylon forms by condensation between a diamine and a dicarboxylic acid', 'A condensation polymer', 'An addition polymer', 'A natural polymer', 'A copolymer'),
            q('Vulcanization of rubber involves adding:', 'HARD', 'Sulfur cross-links rubber chains, improving elasticity and strength', 'Sulfur', 'Chlorine', 'Nitrogen', 'Oxygen'),
          ],
        },
        {
          name: 'Stereochemistry', description: 'Spatial arrangement of atoms in molecules', isFree: false, entryPrice: 150,
          contents: [
            c('Chirality and Enantiomers', 'ARTICLE', 'A chiral molecule has a non-superimposable mirror image. Enantiomers are mirror-image pairs with identical physical properties but opposite optical rotation.', 'Understanding molecular handedness'),
            c('R/S Configuration', 'ARTICLE', 'The Cahn-Ingold-Prelog rules assign priorities to groups around a chiral center. Viewing from opposite the lowest priority group, clockwise is R and counterclockwise is S.', 'Naming chiral centers systematically'),
          ],
          questions: [
            q('A chiral center typically has how many different substituents?', 'EASY', 'A chiral (stereogenic) center has four different groups attached', '4', '2', '3', '6'),
            q('Enantiomers rotate plane-polarized light in:', 'EASY', 'Enantiomers rotate light in equal but opposite directions', 'Opposite directions', 'The same direction', 'No rotation', 'Random directions'),
            q('A racemic mixture contains:', 'MEDIUM', 'Equal amounts of both enantiomers, with no net optical rotation', 'Equal amounts of both enantiomers', 'Only the R form', 'Only the S form', 'No chiral molecules'),
            q('Diastereomers are stereoisomers that are:', 'MEDIUM', 'Diastereomers are not mirror images of each other', 'Not mirror images', 'Mirror images', 'Identical', 'Structural isomers'),
            q('A meso compound has chiral centers but is optically inactive because:', 'HARD', 'An internal mirror plane causes the rotations from each center to cancel', 'It has an internal plane of symmetry', 'It has no chiral centers', 'It is a racemic mixture', 'It is too large to rotate light'),
          ],
        },
      ],
    },
    {
      name: 'Inorganic Chemistry',
      description: 'Metals, minerals, and non-carbon compounds',
      houses: [
        {
          name: 'Periodic Table', description: 'Organization and trends of the elements', isFree: true, entryPrice: null,
          contents: [
            c('Periodic Table Organization', 'ARTICLE', 'Elements are arranged by increasing atomic number. Rows (periods) indicate energy levels, and columns (groups) share similar chemical properties due to identical valence electron configurations.', 'How the periodic table is organized'),
            c('Periodic Trends', 'ARTICLE', 'Atomic radius decreases across a period and increases down a group. Ionization energy and electronegativity generally increase across a period and decrease down a group.', 'Key trends across the periodic table'),
          ],
          questions: [
            q('Elements in the same group have similar:', 'EASY', 'Groups share valence electron count and chemical behavior', 'Chemical properties', 'Atomic mass', 'Number of neutrons', 'Color'),
            q('How many elements are in the periodic table (approx.)?', 'EASY', 'There are currently 118 confirmed elements', '118', '100', '92', '150'),
            q('Atomic radius generally decreases across a period because:', 'MEDIUM', 'More protons pull electrons closer without adding a new shell', 'Increasing nuclear charge pulls electrons inward', 'Electrons are removed', 'Atoms lose neutrons', 'Orbitals shrink randomly'),
            q('Which group contains the noble gases?', 'MEDIUM', 'Noble gases are in Group 18 (the rightmost column)', 'Group 18', 'Group 1', 'Group 17', 'Group 2'),
            q('The element with electron configuration [Ar] 3d¹⁰ 4s² is:', 'HARD', 'Ar has 18 electrons, add 12 more: element 30 = Zinc', 'Zinc (Zn)', 'Copper (Cu)', 'Nickel (Ni)', 'Gallium (Ga)'),
          ],
        },
        {
          name: 'Metals and Alloys', description: 'Properties and applications of metallic elements', isFree: true, entryPrice: null,
          contents: [
            c('Metallic Properties', 'ARTICLE', 'Metals are typically shiny, malleable, ductile, and good conductors of heat and electricity. These properties arise from the "sea of electrons" model of metallic bonding.', 'What makes metals unique'),
            c('Common Alloys', 'ARTICLE', 'Alloys are mixtures of metals with enhanced properties. Steel (iron + carbon) is stronger than pure iron, brass (copper + zinc) resists corrosion, and bronze (copper + tin) is hard and durable.', 'Important alloys and their uses'),
          ],
          questions: [
            q('Metals are good conductors because of:', 'EASY', 'Delocalized electrons carry charge and heat efficiently', 'Free-moving delocalized electrons', 'Tightly packed atoms', 'High melting points', 'Ionic bonds'),
            q('Steel is an alloy of iron and:', 'EASY', 'Steel contains iron with a small percentage of carbon', 'Carbon', 'Copper', 'Tin', 'Zinc'),
            q('Which metal is liquid at room temperature?', 'MEDIUM', 'Mercury (Hg) melts at -38.83°C', 'Mercury', 'Gallium', 'Lead', 'Tin'),
            q('Brass is an alloy of:', 'MEDIUM', 'Brass = copper + zinc', 'Copper and zinc', 'Copper and tin', 'Iron and carbon', 'Aluminum and copper'),
            q('Which metal has the highest electrical conductivity?', 'HARD', 'Silver has the highest conductivity, followed by copper and gold', 'Silver', 'Copper', 'Gold', 'Aluminum'),
          ],
        },
        {
          name: 'Coordination Compounds', description: 'Metal complexes with ligands', isFree: false, entryPrice: 120,
          contents: [
            c('Coordination Chemistry Basics', 'ARTICLE', 'Coordination compounds consist of a central metal ion surrounded by ligands. The coordination number is the number of ligand attachment points. Common geometries include octahedral and tetrahedral.', 'Introduction to metal complexes'),
            c('Crystal Field Theory', 'ARTICLE', 'Crystal field theory explains the colors and magnetic properties of coordination compounds. Ligands split d-orbital energies; strong-field ligands cause large splitting and low-spin complexes.', 'Understanding d-orbital splitting'),
          ],
          questions: [
            q('A ligand is:', 'EASY', 'Ligands are molecules or ions that donate electron pairs to a metal center', 'An electron pair donor to a metal', 'A type of metal', 'A crystal structure', 'An ionic compound'),
            q('The coordination number of [Cu(NH₃)₄]²⁺ is:', 'EASY', 'Four NH₃ ligands are attached to copper', '4', '2', '6', '8'),
            q('A bidentate ligand donates how many electron pairs?', 'MEDIUM', 'Bi- means two: a bidentate ligand has two donor atoms', '2', '1', '3', '4'),
            q('Octahedral complexes have coordination number:', 'MEDIUM', 'Octahedral geometry has 6 ligand positions', '6', '4', '8', '12'),
            q('In crystal field theory, the color of a complex depends on:', 'HARD', 'The d-d transition absorbs specific wavelengths; the complement is the observed color', 'The energy gap between split d-orbitals', 'The number of electrons', 'The charge of the metal', 'The mass of ligands'),
          ],
        },
        {
          name: 'Acids and Bases', description: 'Proton donors, acceptors, and pH scale', isFree: true, entryPrice: null,
          contents: [
            c('Acid-Base Definitions', 'ARTICLE', 'Arrhenius: acids produce H⁺, bases produce OH⁻. Brønsted-Lowry: acids donate protons, bases accept them. Lewis: acids accept electron pairs, bases donate them.', 'Three ways to define acids and bases'),
            c('The pH Scale', 'ARTICLE', 'pH = -log[H⁺] and ranges from 0 to 14. pH < 7 is acidic, pH = 7 is neutral, pH > 7 is basic. Each unit represents a tenfold change in H⁺ concentration.', 'Measuring acidity and basicity'),
          ],
          questions: [
            q('A solution with pH 3 is:', 'EASY', 'pH < 7 is acidic', 'Acidic', 'Basic', 'Neutral', 'Cannot determine'),
            q('In the Brønsted-Lowry definition, a base:', 'EASY', 'Brønsted-Lowry bases are proton acceptors', 'Accepts a proton', 'Donates a proton', 'Produces OH⁻', 'Accepts electrons'),
            q('What is the pH of a 0.01 M HCl solution?', 'MEDIUM', 'pH = -log(0.01) = -log(10⁻²) = 2', '2', '1', '0.01', '12'),
            q('A buffer solution resists changes in:', 'MEDIUM', 'Buffers maintain pH when small amounts of acid or base are added', 'pH', 'Temperature', 'Volume', 'Concentration'),
            q('What is the conjugate base of H₂SO₄?', 'HARD', 'Remove one proton from H₂SO₄ to get HSO₄⁻', 'HSO₄⁻', 'SO₄²⁻', 'H₃SO₄⁺', 'H₂O'),
          ],
        },
        {
          name: 'Redox Reactions', description: 'Oxidation-reduction and electron transfer', isFree: false, entryPrice: 100,
          contents: [
            c('Oxidation and Reduction', 'ARTICLE', 'Oxidation is the loss of electrons; reduction is the gain of electrons. They always occur together. A useful mnemonic is OIL RIG: Oxidation Is Loss, Reduction Is Gain.', 'Understanding electron transfer in reactions'),
            c('Balancing Redox Equations', 'ARTICLE', 'Redox equations can be balanced using the half-reaction method: separate into oxidation and reduction half-reactions, balance each, then combine.', 'Techniques for balancing redox equations'),
          ],
          questions: [
            q('In oxidation, an atom:', 'EASY', 'OIL: Oxidation Is Loss of electrons', 'Loses electrons', 'Gains electrons', 'Gains protons', 'Loses protons'),
            q('What is the oxidation state of O in most compounds?', 'EASY', 'Oxygen is typically -2 (except in peroxides and OF₂)', '-2', '-1', '0', '+2'),
            q('In the reaction Zn + Cu²⁺ → Zn²⁺ + Cu, zinc is:', 'MEDIUM', 'Zinc goes from 0 to +2, losing electrons', 'Oxidized', 'Reduced', 'A catalyst', 'Unchanged'),
            q('A reducing agent is a substance that:', 'MEDIUM', 'A reducing agent donates electrons and is itself oxidized', 'Donates electrons (gets oxidized)', 'Accepts electrons (gets reduced)', 'Donates protons', 'Accepts protons'),
            q('In the half-reaction Fe³⁺ + e⁻ → Fe²⁺, iron is:', 'HARD', 'Fe³⁺ gains an electron, decreasing its charge: reduction', 'Reduced', 'Oxidized', 'Neutral', 'A catalyst'),
          ],
        },
      ],
    },
    {
      name: 'Physical Chemistry',
      description: 'Energy, kinetics, and equilibrium at the molecular level',
      houses: [
        {
          name: 'Thermochemistry', description: 'Heat changes in chemical reactions', isFree: true, entryPrice: null,
          contents: [
            c('Enthalpy and Heat', 'ARTICLE', 'Enthalpy (H) measures heat content at constant pressure. Exothermic reactions release heat (ΔH < 0) and endothermic reactions absorb heat (ΔH > 0).', 'Heat changes in chemical processes'),
            c('Hess\'s Law', 'ARTICLE', 'Hess\'s law states that the total enthalpy change is the same regardless of the pathway. This allows calculation of ΔH for reactions that are hard to measure directly.', 'Path independence of enthalpy changes'),
          ],
          questions: [
            q('An exothermic reaction:', 'EASY', 'Exothermic reactions release heat to the surroundings', 'Releases heat', 'Absorbs heat', 'Has no energy change', 'Requires a catalyst'),
            q('The units of enthalpy are typically:', 'EASY', 'Enthalpy is measured in kilojoules per mole', 'kJ/mol', 'kg/L', 'm/s', 'atm'),
            q('Hess\'s law relies on enthalpy being a:', 'MEDIUM', 'State functions depend only on initial and final states', 'State function', 'Path function', 'Vector', 'Rate constant'),
            q('The standard enthalpy of formation of an element in its standard state is:', 'MEDIUM', 'By definition, elements in standard state have ΔHf° = 0', '0', '1', '-1', 'Variable'),
            q('Calculate ΔH° for C(s) + O₂(g) → CO₂(g) given ΔHf°(CO₂) = -393.5 kJ/mol', 'HARD', 'ΔH° = ΔHf°(products) - ΔHf°(reactants) = -393.5 - 0 - 0', '-393.5 kJ/mol', '+393.5 kJ/mol', '-196.75 kJ/mol', '0 kJ/mol'),
          ],
        },
        {
          name: 'Chemical Kinetics', description: 'Reaction rates and rate laws', isFree: false, entryPrice: 100,
          contents: [
            c('Reaction Rate Factors', 'ARTICLE', 'Reaction rates depend on concentration, temperature, surface area, and catalysts. Higher temperature increases molecular kinetic energy and collision frequency.', 'What controls how fast reactions occur'),
            c('Rate Laws', 'ARTICLE', 'A rate law relates reaction rate to reactant concentrations: rate = k[A]ᵐ[B]ⁿ. The order (m, n) is determined experimentally, not from stoichiometry.', 'Mathematical description of reaction rates'),
          ],
          questions: [
            q('Increasing temperature generally:', 'EASY', 'Higher temperature means faster molecular motion and more effective collisions', 'Increases reaction rate', 'Decreases reaction rate', 'Has no effect', 'Stops the reaction'),
            q('A catalyst works by:', 'EASY', 'Catalysts provide an alternative pathway with lower activation energy', 'Lowering activation energy', 'Increasing temperature', 'Adding reactants', 'Changing equilibrium'),
            q('For rate = k[A]², the reaction is ___-order in A', 'MEDIUM', 'The exponent of [A] gives the order with respect to A', 'Second', 'First', 'Zero', 'Third'),
            q('The units of a first-order rate constant are:', 'MEDIUM', 'For rate = k[A], k = rate/[A] = (M/s)/M = 1/s', 's⁻¹', 'M⁻¹s⁻¹', 'M/s', 'M⁻²s⁻¹'),
            q('The half-life of a first-order reaction is:', 'HARD', 'For first-order: t₁/₂ = ln(2)/k = 0.693/k', '0.693/k', 'k/0.693', '1/(2k)', '0.693k'),
          ],
        },
        {
          name: 'Chemical Equilibrium', description: 'Reversible reactions and Le Chatelier\'s principle', isFree: true, entryPrice: null,
          contents: [
            c('Dynamic Equilibrium', 'ARTICLE', 'At equilibrium, forward and reverse reaction rates are equal and concentrations remain constant. The equilibrium constant K expresses the ratio of product to reactant concentrations.', 'Understanding chemical equilibrium'),
            c('Le Chatelier\'s Principle', 'ARTICLE', 'When a system at equilibrium is disturbed, it shifts to partially counteract the change. Adding reactant shifts toward products; increasing pressure shifts toward fewer moles of gas.', 'How equilibrium responds to changes'),
          ],
          questions: [
            q('At equilibrium, the rates of forward and reverse reactions are:', 'EASY', 'Dynamic equilibrium means both directions proceed at the same rate', 'Equal', 'Zero', 'Maximum', 'Unpredictable'),
            q('If K >> 1, the reaction:', 'EASY', 'Large K means products are favored at equilibrium', 'Favors products', 'Favors reactants', 'Is at a midpoint', 'Does not proceed'),
            q('Adding more reactant to a system at equilibrium:', 'MEDIUM', 'Le Chatelier: the system shifts right to consume excess reactant', 'Shifts equilibrium toward products', 'Shifts toward reactants', 'Has no effect', 'Stops the reaction'),
            q('For N₂ + 3H₂ ⇌ 2NH₃, increasing pressure:', 'MEDIUM', 'Left side: 4 mol gas, right: 2 mol. Pressure increase favors fewer moles', 'Shifts toward NH₃ (products)', 'Shifts toward N₂ and H₂', 'No effect', 'Reverses the reaction'),
            q('The equilibrium constant expression for aA + bB ⇌ cC + dD is:', 'HARD', 'K = [C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ at equilibrium', '[C]ᶜ[D]ᵈ / [A]ᵃ[B]ᵇ', '[A]ᵃ[B]ᵇ / [C]ᶜ[D]ᵈ', '(c+d) / (a+b)', '[C][D] / [A][B]'),
          ],
        },
        {
          name: 'Electrochemistry', description: 'Electricity from chemical reactions', isFree: false, entryPrice: 120,
          contents: [
            c('Galvanic Cells', 'ARTICLE', 'A galvanic (voltaic) cell converts chemical energy to electrical energy. Oxidation occurs at the anode and reduction at the cathode. The cell potential drives electron flow.', 'How batteries work chemically'),
            c('The Nernst Equation', 'ARTICLE', 'The Nernst equation relates cell potential to concentration: E = E° - (RT/nF)lnQ. It shows how non-standard conditions affect voltage.', 'Calculating cell potential under non-standard conditions'),
          ],
          questions: [
            q('In a galvanic cell, oxidation occurs at the:', 'EASY', 'AN OX, RED CAT: anode = oxidation, cathode = reduction', 'Anode', 'Cathode', 'Salt bridge', 'Electrolyte'),
            q('Electrons flow from the ___ to the ___ in a galvanic cell:', 'EASY', 'Electrons are produced at the anode and consumed at the cathode', 'Anode to cathode', 'Cathode to anode', 'Salt bridge to cell', 'Electrolyte to electrode'),
            q('The standard cell potential E° is calculated as:', 'MEDIUM', 'E°cell = E°cathode - E°anode', 'E°cathode - E°anode', 'E°anode - E°cathode', 'E°cathode + E°anode', 'E°cathode × E°anode'),
            q('The Faraday constant F equals approximately:', 'MEDIUM', 'F = charge of one mole of electrons ≈ 96,485 C/mol', '96,485 C/mol', '8.314 J/(mol·K)', '6.022 × 10²³', '1.602 × 10⁻¹⁹ C'),
            q('In electrolysis, energy is:', 'HARD', 'Electrolysis uses electrical energy to drive non-spontaneous reactions', 'Supplied to force a non-spontaneous reaction', 'Released spontaneously', 'Neither used nor released', 'Converted to heat only'),
          ],
        },
        {
          name: 'Quantum Chemistry', description: 'Quantum mechanics applied to chemical systems', isFree: false, entryPrice: 200,
          contents: [
            c('Wave-Particle Duality', 'ARTICLE', 'Electrons exhibit both particle and wave behavior. De Broglie showed that any particle has a wavelength λ = h/mv. This wave nature explains electron orbitals and chemical bonding.', 'The dual nature of matter'),
            c('Molecular Orbital Theory', 'ARTICLE', 'Molecular orbitals form by combining atomic orbitals. Bonding MOs are lower energy and stabilize the molecule; antibonding MOs are higher energy and destabilize it.', 'Understanding bonding through molecular orbitals'),
          ],
          questions: [
            q('The de Broglie wavelength of a particle depends on its:', 'EASY', 'λ = h/mv, so it depends on momentum (mass × velocity)', 'Momentum', 'Charge', 'Temperature', 'Color'),
            q('Heisenberg\'s uncertainty principle states that:', 'EASY', 'Position and momentum cannot both be known precisely simultaneously', 'Position and momentum cannot both be exactly known', 'Energy is always conserved', 'Electrons are particles only', 'Atoms are indivisible'),
            q('A bonding molecular orbital has ___ energy than the atomic orbitals:', 'MEDIUM', 'Bonding MOs are lower in energy, providing stability', 'Lower', 'Higher', 'Equal', 'Variable'),
            q('The bond order formula is:', 'MEDIUM', 'Bond order = (bonding electrons - antibonding electrons) / 2', '(bonding e⁻ - antibonding e⁻) / 2', 'bonding e⁻ + antibonding e⁻', 'bonding e⁻ / antibonding e⁻', 'Total e⁻ / 2'),
            q('In MO theory, O₂ is paramagnetic because:', 'HARD', 'O₂ has two unpaired electrons in π* antibonding orbitals', 'It has unpaired electrons in antibonding orbitals', 'It has no bonding electrons', 'Oxygen atoms are magnetic', 'It has a triple bond'),
          ],
        },
      ],
    },
    {
      name: 'Biochemistry',
      description: 'Chemistry of living organisms',
      houses: [
        {
          name: 'Proteins', description: 'Amino acids, peptide bonds, and protein structure', isFree: true, entryPrice: null,
          contents: [
            c('Amino Acids and Peptide Bonds', 'ARTICLE', 'Proteins are polymers of amino acids linked by peptide bonds (C-N bonds formed by condensation). There are 20 standard amino acids, each with a unique side chain (R group).', 'The building blocks of proteins'),
            c('Protein Structure Levels', 'ARTICLE', 'Primary structure is the amino acid sequence. Secondary structure includes alpha helices and beta sheets. Tertiary is the 3D fold. Quaternary involves multiple subunits.', 'The four levels of protein organization'),
          ],
          questions: [
            q('How many standard amino acids are there?', 'EASY', 'There are 20 standard amino acids encoded by DNA', '20', '12', '26', '4'),
            q('A peptide bond links:', 'EASY', 'A peptide bond connects the amino group of one amino acid to the carboxyl of another', 'Two amino acids', 'Two sugars', 'A sugar and an amino acid', 'Two nucleotides'),
            q('Alpha helices and beta sheets are examples of:', 'MEDIUM', 'These are regular local folding patterns = secondary structure', 'Secondary structure', 'Primary structure', 'Tertiary structure', 'Quaternary structure'),
            q('Denaturation of a protein destroys its:', 'MEDIUM', 'Denaturation unfolds the 3D shape but leaves the amino acid sequence intact', '3D shape (tertiary structure)', 'Primary structure', 'Amino acid composition', 'Peptide bonds'),
            q('Hemoglobin\'s four subunits illustrate which structural level?', 'HARD', 'Multiple polypeptide chains associating = quaternary structure', 'Quaternary', 'Tertiary', 'Secondary', 'Primary'),
          ],
        },
        {
          name: 'Carbohydrates', description: 'Sugars, starches, and polysaccharides', isFree: true, entryPrice: null,
          contents: [
            c('Types of Carbohydrates', 'ARTICLE', 'Carbohydrates are classified as monosaccharides (glucose), disaccharides (sucrose), and polysaccharides (starch, cellulose). They serve as energy sources and structural components.', 'Classification of carbohydrates'),
            c('Glycosidic Bonds', 'ARTICLE', 'Monosaccharides link through glycosidic bonds to form larger carbohydrates. The type of bond (alpha or beta) determines properties: starch has alpha bonds (digestible), cellulose has beta bonds (structural).', 'How sugars connect to form polymers'),
          ],
          questions: [
            q('Glucose is classified as a:', 'EASY', 'Glucose is a single sugar unit = monosaccharide', 'Monosaccharide', 'Disaccharide', 'Polysaccharide', 'Lipid'),
            q('Sucrose is made of glucose and:', 'EASY', 'Table sugar (sucrose) = glucose + fructose', 'Fructose', 'Galactose', 'Ribose', 'Maltose'),
            q('Starch is a polymer of:', 'MEDIUM', 'Starch is a polysaccharide of alpha-glucose units', 'Glucose', 'Fructose', 'Amino acids', 'Nucleotides'),
            q('Cellulose differs from starch in its:', 'MEDIUM', 'Both are glucose polymers but differ in bond type (alpha vs beta)', 'Glycosidic bond type (beta vs alpha)', 'Monomer identity', 'Elemental composition', 'Molecular weight only'),
            q('The molecular formula of glucose is:', 'HARD', 'Glucose is C₆H₁₂O₆, the most common monosaccharide', 'C₆H₁₂O₆', 'C₁₂H₂₂O₁₁', 'C₅H₁₀O₅', 'C₆H₁₀O₅'),
          ],
        },
        {
          name: 'Lipids', description: 'Fats, oils, and cell membranes', isFree: false, entryPrice: 80,
          contents: [
            c('Types of Lipids', 'ARTICLE', 'Lipids include fats, oils, phospholipids, and steroids. They are hydrophobic molecules used for energy storage, membrane structure, and signaling.', 'Overview of lipid categories'),
            c('Fatty Acids', 'ARTICLE', 'Fatty acids are long hydrocarbon chains with a carboxyl group. Saturated fatty acids have no double bonds; unsaturated fatty acids have one or more double bonds, creating kinks.', 'Saturated vs unsaturated fats'),
          ],
          questions: [
            q('Lipids are primarily characterized by being:', 'EASY', 'Lipids are hydrophobic (insoluble in water)', 'Hydrophobic', 'Hydrophilic', 'Positively charged', 'Acidic'),
            q('Saturated fats have:', 'EASY', 'Saturated means no C=C double bonds in the hydrocarbon chain', 'No double bonds', 'Many double bonds', 'Ring structures', 'Nitrogen atoms'),
            q('Phospholipids form cell membranes because they are:', 'MEDIUM', 'They have a hydrophilic head and hydrophobic tails', 'Amphipathic (both hydrophilic and hydrophobic parts)', 'Completely hydrophobic', 'Completely hydrophilic', 'Ionic'),
            q('Trans fats are harmful because they:', 'MEDIUM', 'Trans configuration keeps chains straight, increasing packing and raising LDL cholesterol', 'Increase LDL cholesterol and heart disease risk', 'Are unsaturated', 'Contain nitrogen', 'Are natural compounds'),
            q('Cholesterol is classified as a:', 'HARD', 'Cholesterol has four fused carbon rings, characteristic of steroids', 'Steroid', 'Triglyceride', 'Phospholipid', 'Wax'),
          ],
        },
        {
          name: 'Nucleic Acids', description: 'DNA, RNA, and genetic information', isFree: false, entryPrice: 120,
          contents: [
            c('DNA Structure', 'ARTICLE', 'DNA is a double helix of two antiparallel strands connected by complementary base pairing: adenine with thymine (A-T), guanine with cytosine (G-C). The sugar is deoxyribose.', 'The structure of the genetic blueprint'),
            c('RNA and Transcription', 'ARTICLE', 'RNA is single-stranded with ribose sugar and uracil instead of thymine. mRNA carries genetic code from DNA to ribosomes, where tRNA brings amino acids for protein synthesis.', 'From DNA to RNA to protein'),
          ],
          questions: [
            q('The base pairs in DNA are:', 'EASY', 'A pairs with T, G pairs with C (Chargaff\'s rules)', 'A-T and G-C', 'A-G and T-C', 'A-C and G-T', 'A-U and G-C'),
            q('DNA stands for:', 'EASY', 'Deoxyribonucleic acid', 'Deoxyribonucleic acid', 'Dinitrogen acid', 'Deoxyribose nucleotide assembly', 'Double nucleic acid'),
            q('RNA differs from DNA by having:', 'MEDIUM', 'RNA has ribose sugar and uracil instead of deoxyribose and thymine', 'Ribose sugar and uracil', 'Deoxyribose and thymine', 'Double strand', 'No phosphate groups'),
            q('The central dogma of biology is:', 'MEDIUM', 'DNA → RNA → Protein describes the flow of genetic information', 'DNA → RNA → Protein', 'Protein → RNA → DNA', 'RNA → DNA → Protein', 'DNA → Protein → RNA'),
            q('A codon consists of how many nucleotides?', 'HARD', 'Each codon is a sequence of 3 nucleotides coding for one amino acid', '3', '2', '4', '1'),
          ],
        },
        {
          name: 'Enzymes', description: 'Biological catalysts and kinetics', isFree: true, entryPrice: null,
          contents: [
            c('How Enzymes Work', 'ARTICLE', 'Enzymes are protein catalysts that lower activation energy. They bind substrates at the active site with high specificity, following the lock-and-key or induced-fit model.', 'The mechanism of enzyme catalysis'),
            c('Enzyme Kinetics', 'ARTICLE', 'Michaelis-Menten kinetics describes enzyme rate as a function of substrate concentration. Vmax is the maximum rate; Km is the substrate concentration at half Vmax.', 'Mathematical modeling of enzyme activity'),
          ],
          questions: [
            q('Enzymes are mostly made of:', 'EASY', 'Most enzymes are proteins (some are RNA = ribozymes)', 'Proteins', 'Lipids', 'Carbohydrates', 'Nucleic acids'),
            q('The active site of an enzyme:', 'EASY', 'The active site is where the substrate binds and the reaction occurs', 'Binds the substrate', 'Is made of lipids', 'Is always the entire enzyme', 'Repels the substrate'),
            q('Competitive inhibitors:', 'MEDIUM', 'They compete with the substrate for the active site', 'Bind at the active site', 'Bind at an allosteric site', 'Destroy the enzyme', 'Increase Vmax'),
            q('Km represents:', 'MEDIUM', 'Km is the substrate concentration at which rate = Vmax/2', 'Substrate concentration at half Vmax', 'Maximum reaction rate', 'Enzyme concentration', 'Inhibitor strength'),
            q('An enzyme with a low Km has:', 'HARD', 'Low Km means the enzyme reaches half-max rate at low substrate: high affinity', 'High affinity for its substrate', 'Low affinity for its substrate', 'A slow reaction rate', 'No inhibition'),
          ],
        },
      ],
    },
  ],
};
// ─── PHYSICS ─────────────────────────────────────────────────

const physics: SeedKingdom = {
  name: 'Physics',
  description: 'The kingdom of matter, energy, forces, and the laws of nature',
  villages: [
    {
      name: 'Classical Mechanics',
      description: 'Motion, forces, and energy in everyday scales',
      houses: [
        {
          name: 'Newton\'s Laws', description: 'The three laws governing motion and force', isFree: true, entryPrice: null,
          contents: [
            c('Newton\'s Three Laws', 'ARTICLE', 'First law: objects remain at rest or in motion unless acted on by a force. Second law: F = ma. Third law: every action has an equal and opposite reaction.', 'The foundational laws of mechanics'),
            c('Applying Newton\'s Laws', 'ARTICLE', 'Free-body diagrams isolate forces on an object. By summing forces and applying F = ma, we can predict motion, calculate acceleration, and determine unknown forces.', 'Problem-solving with Newton\'s laws'),
          ],
          questions: [
            q('Newton\'s first law is also called the law of:', 'EASY', 'An object resists changes in its state of motion', 'Inertia', 'Gravity', 'Action-reaction', 'Acceleration'),
            q('F = ma is Newton\'s ___ law', 'EASY', 'The second law relates force, mass, and acceleration', 'Second', 'First', 'Third', 'Fourth'),
            q('A 5 kg object accelerates at 3 m/s². The net force is:', 'MEDIUM', 'F = ma = 5 × 3 = 15 N', '15 N', '8 N', '1.67 N', '45 N'),
            q('Newton\'s third law states that forces come in:', 'MEDIUM', 'Every action has an equal and opposite reaction', 'Equal and opposite pairs', 'Unequal pairs', 'Single forces', 'Triple groups'),
            q('A 10 kg block on a frictionless surface has two forces: 30 N right and 10 N left. Its acceleration is:', 'HARD', 'Net force = 30-10 = 20 N, a = F/m = 20/10 = 2 m/s² right', '2 m/s² to the right', '4 m/s² to the right', '2 m/s² to the left', '3 m/s²'),
          ],
        },
        {
          name: 'Work and Energy', description: 'Energy transfer, conservation, and power', isFree: true, entryPrice: null,
          contents: [
            c('Work and Kinetic Energy', 'ARTICLE', 'Work is done when a force moves an object: W = Fd·cos(θ). The work-energy theorem states that net work equals the change in kinetic energy: W = ΔKE.', 'Energy transfer through forces'),
            c('Conservation of Energy', 'ARTICLE', 'Energy cannot be created or destroyed, only transformed. In a closed system, total mechanical energy (KE + PE) is constant if only conservative forces act.', 'The fundamental energy conservation law'),
          ],
          questions: [
            q('The SI unit of work is:', 'EASY', 'Work is measured in Joules (J = N·m)', 'Joule', 'Watt', 'Newton', 'Pascal'),
            q('Kinetic energy depends on mass and:', 'EASY', 'KE = ½mv²', 'Velocity squared', 'Height', 'Acceleration', 'Force'),
            q('An object falls from 10 m. Its speed just before hitting the ground is (g=10):', 'MEDIUM', 'PE = KE: mgh = ½mv², v = √(2gh) = √200 ≈ 14.1 m/s', '≈ 14.1 m/s', '10 m/s', '20 m/s', '100 m/s'),
            q('Power is defined as:', 'MEDIUM', 'Power = work done per unit time, measured in Watts', 'Work per unit time', 'Force per unit area', 'Energy per unit mass', 'Force times distance'),
            q('A 2 kg ball moving at 3 m/s has kinetic energy of:', 'HARD', 'KE = ½mv² = ½(2)(9) = 9 J', '9 J', '6 J', '3 J', '18 J'),
          ],
        },
        {
          name: 'Momentum', description: 'Linear momentum and collisions', isFree: false, entryPrice: 80,
          contents: [
            c('Linear Momentum', 'ARTICLE', 'Momentum p = mv is a vector quantity. The impulse-momentum theorem states that impulse (FΔt) equals the change in momentum.', 'Understanding momentum and impulse'),
            c('Conservation of Momentum', 'ARTICLE', 'In the absence of external forces, total momentum is conserved. In elastic collisions, kinetic energy is also conserved; in inelastic collisions, it is not.', 'Momentum in collisions'),
          ],
          questions: [
            q('Momentum equals:', 'EASY', 'p = mass × velocity', 'Mass × velocity', 'Mass × acceleration', 'Force × time', 'Force × distance'),
            q('The unit of momentum is:', 'EASY', 'kg·m/s or equivalently N·s', 'kg·m/s', 'N/m', 'J/s', 'kg·m/s²'),
            q('In a perfectly inelastic collision, the objects:', 'MEDIUM', 'They stick together and move as one', 'Stick together', 'Bounce apart elastically', 'Both stop', 'Exchange velocities'),
            q('A 3 kg ball moving at 4 m/s has momentum of:', 'MEDIUM', 'p = mv = 3 × 4 = 12 kg·m/s', '12 kg·m/s', '7 kg·m/s', '1.33 kg·m/s', '48 kg·m/s'),
            q('Two objects (2 kg at 5 m/s and 3 kg at rest) collide and stick. Their final velocity is:', 'HARD', 'Conservation: 2(5) + 3(0) = 5v, v = 10/5 = 2 m/s', '2 m/s', '5 m/s', '3 m/s', '1 m/s'),
          ],
        },
        {
          name: 'Rotational Motion', description: 'Angular velocity, torque, and moment of inertia', isFree: false, entryPrice: 120,
          contents: [
            c('Angular Quantities', 'ARTICLE', 'Angular displacement (θ), angular velocity (ω), and angular acceleration (α) are rotational analogs of linear quantities. They are related by equations similar to linear kinematics.', 'Rotational analogs of linear motion'),
            c('Torque and Rotational Inertia', 'ARTICLE', 'Torque (τ = rFsin θ) is the rotational analog of force. Moment of inertia (I) is the rotational analog of mass. Newton\'s second law becomes τ = Iα.', 'Forces that cause rotation'),
          ],
          questions: [
            q('Angular velocity is measured in:', 'EASY', 'Radians per second (rad/s)', 'rad/s', 'm/s', 'kg·m/s', 'N·m'),
            q('Torque depends on force and:', 'EASY', 'τ = r × F × sin(θ), so it depends on the lever arm distance', 'The distance from the pivot', 'Mass', 'Velocity', 'Temperature'),
            q('The moment of inertia is the rotational analog of:', 'MEDIUM', 'I plays the role that mass plays in linear motion', 'Mass', 'Force', 'Velocity', 'Acceleration'),
            q('τ = Iα is the rotational form of:', 'MEDIUM', 'It is the rotational version of F = ma', 'Newton\'s second law', 'Newton\'s first law', 'Conservation of energy', 'Hooke\'s law'),
            q('A solid disk has moment of inertia I = ½MR². If M = 4 kg and R = 0.5 m, I = ?', 'HARD', 'I = ½(4)(0.25) = 0.5 kg·m²', '0.5 kg·m²', '1 kg·m²', '2 kg·m²', '0.25 kg·m²'),
          ],
        },
        {
          name: 'Gravitation', description: 'Universal gravitation and orbital mechanics', isFree: true, entryPrice: null,
          contents: [
            c('Newton\'s Law of Gravitation', 'ARTICLE', 'Every two masses attract each other with force F = GMm/r². G is the gravitational constant (6.674 × 10⁻¹¹ N·m²/kg²). This explains both falling apples and orbiting planets.', 'The universal force of gravity'),
            c('Orbital Mechanics', 'ARTICLE', 'For a circular orbit, gravitational force provides centripetal acceleration: GMm/r² = mv²/r. Kepler\'s laws describe elliptical orbits, equal-area sweeping, and the period-radius relationship.', 'How objects orbit in space'),
          ],
          questions: [
            q('Gravitational force between two objects depends on their masses and:', 'EASY', 'F = GMm/r², so it depends on the distance between them', 'Distance between them', 'Velocities', 'Temperatures', 'Colors'),
            q('As distance between two masses doubles, gravity becomes:', 'EASY', 'Inverse square law: F ∝ 1/r², doubling r gives 1/4 the force', 'One-quarter as strong', 'Half as strong', 'Twice as strong', 'Four times as strong'),
            q('The gravitational constant G is approximately:', 'MEDIUM', 'G ≈ 6.674 × 10⁻¹¹ N·m²/kg²', '6.674 × 10⁻¹¹ N·m²/kg²', '9.81 m/s²', '3 × 10⁸ m/s', '6.022 × 10²³'),
            q('Kepler\'s third law relates orbital period to:', 'MEDIUM', 'T² ∝ r³ — period squared is proportional to semi-major axis cubed', 'Semi-major axis cubed', 'Velocity', 'Mass of satellite', 'Eccentricity'),
            q('The escape velocity from Earth\'s surface is approximately:', 'HARD', 'v_escape = √(2GM/R) ≈ 11.2 km/s', '11.2 km/s', '7.9 km/s', '3.0 km/s', '30 km/s'),
          ],
        },
      ],
    },
    {
      name: 'Thermodynamics',
      description: 'Heat, work, and energy transfer',
      houses: [
        {
          name: 'Temperature and Heat', description: 'Thermal energy and temperature scales', isFree: true, entryPrice: null,
          contents: [
            c('Heat vs Temperature', 'ARTICLE', 'Temperature measures average kinetic energy of molecules. Heat is the transfer of thermal energy between objects at different temperatures. They are related but distinct concepts.', 'The difference between heat and temperature'),
            c('Heat Transfer Methods', 'ARTICLE', 'Heat transfers by conduction (direct contact), convection (fluid flow), and radiation (electromagnetic waves). Each mechanism dominates in different situations.', 'How thermal energy moves between objects'),
          ],
          questions: [
            q('Heat flows from ___ to ___ objects:', 'EASY', 'The second law dictates heat flows from hot to cold spontaneously', 'Hot to cold', 'Cold to hot', 'Large to small', 'Small to large'),
            q('The SI unit of temperature is:', 'EASY', 'Kelvin is the SI base unit for temperature', 'Kelvin', 'Celsius', 'Fahrenheit', 'Joule'),
            q('Specific heat capacity measures:', 'MEDIUM', 'c = energy needed to raise 1 kg by 1 K', 'Energy per unit mass per degree', 'Total heat energy', 'Temperature change', 'Thermal conductivity'),
            q('Water has a high specific heat, meaning:', 'MEDIUM', 'It takes a lot of energy to change water\'s temperature', 'It resists temperature changes', 'It heats up quickly', 'It conducts heat well', 'It boils easily'),
            q('Convert 25°C to Kelvin:', 'HARD', 'K = °C + 273.15 = 298.15 K', '298.15 K', '25 K', '248.15 K', '373.15 K'),
          ],
        },
        {
          name: 'Laws of Thermodynamics', description: 'The four fundamental thermodynamic laws', isFree: true, entryPrice: null,
          contents: [
            c('The Four Laws', 'ARTICLE', 'Zeroth law: thermal equilibrium is transitive. First law: energy is conserved (ΔU = Q - W). Second law: entropy of an isolated system never decreases. Third law: entropy approaches zero at absolute zero.', 'The foundational laws of thermodynamics'),
            c('Entropy', 'ARTICLE', 'Entropy measures disorder or the number of microstates. Natural processes tend to increase total entropy. This is why heat flows from hot to cold and why perpetual motion machines are impossible.', 'Understanding disorder and the arrow of time'),
          ],
          questions: [
            q('The first law of thermodynamics is essentially:', 'EASY', 'Energy cannot be created or destroyed', 'Conservation of energy', 'Entropy always increases', 'Heat flows from hot to cold', 'Absolute zero is unattainable'),
            q('Entropy is a measure of:', 'EASY', 'Entropy quantifies disorder or randomness', 'Disorder', 'Temperature', 'Pressure', 'Volume'),
            q('The second law states that total entropy of an isolated system:', 'MEDIUM', 'Entropy never decreases in an isolated system', 'Never decreases', 'Always decreases', 'Stays constant', 'Equals zero'),
            q('In the first law, ΔU = Q - W, W represents:', 'MEDIUM', 'W is the work done BY the system on its surroundings', 'Work done by the system', 'Work done on the system', 'Heat absorbed', 'Internal energy'),
            q('At absolute zero (0 K), a perfect crystal has entropy:', 'HARD', 'The third law: S = 0 for a perfect crystal at 0 K', 'Zero', 'Maximum', 'Undefined', 'Negative'),
          ],
        },
        {
          name: 'Heat Engines', description: 'Converting heat to work', isFree: false, entryPrice: 100,
          contents: [
            c('How Heat Engines Work', 'ARTICLE', 'A heat engine absorbs heat from a hot reservoir, converts some to work, and dumps the rest into a cold reservoir. No engine can convert all heat to work (second law).', 'The thermodynamic cycle of engines'),
            c('Carnot Efficiency', 'ARTICLE', 'The Carnot engine is the most efficient possible engine operating between two temperatures. Its efficiency is η = 1 - Tc/Th, where temperatures are in Kelvin.', 'The theoretical maximum efficiency'),
          ],
          questions: [
            q('A heat engine converts heat into:', 'EASY', 'Heat engines produce useful work from thermal energy', 'Work', 'More heat', 'Cold', 'Electricity directly'),
            q('The Carnot efficiency depends on:', 'EASY', 'η = 1 - Tc/Th uses the hot and cold reservoir temperatures', 'The temperatures of hot and cold reservoirs', 'The type of fuel', 'The engine size', 'The working fluid'),
            q('No heat engine can be 100% efficient because of the:', 'MEDIUM', 'The second law forbids complete conversion of heat to work', 'Second law of thermodynamics', 'First law', 'Third law', 'Conservation of mass'),
            q('A Carnot engine between 600 K and 300 K has efficiency:', 'MEDIUM', 'η = 1 - 300/600 = 1 - 0.5 = 0.5 = 50%', '50%', '100%', '25%', '75%'),
            q('A refrigerator is a heat engine running in:', 'HARD', 'A refrigerator uses work to move heat from cold to hot: reversed cycle', 'Reverse', 'Forward', 'Parallel', 'The same direction'),
          ],
        },
        {
          name: 'Thermal Expansion', description: 'How materials expand with temperature', isFree: true, entryPrice: null,
          contents: [
            c('Linear and Volume Expansion', 'ARTICLE', 'Most materials expand when heated. Linear expansion: ΔL = αLΔT. Volume expansion: ΔV = βVΔT. The coefficients α and β are material-specific properties.', 'How size changes with temperature'),
            c('Applications of Thermal Expansion', 'ARTICLE', 'Thermal expansion explains why bridges have expansion joints, why bimetallic strips bend (different metals expand differently), and why glass can crack with rapid temperature changes.', 'Real-world effects of thermal expansion'),
          ],
          questions: [
            q('Most materials ___ when heated:', 'EASY', 'Heating increases atomic vibrations, causing expansion', 'Expand', 'Contract', 'Stay the same', 'Melt'),
            q('Water is unusual because it is densest at:', 'EASY', 'Water has maximum density at about 4°C', '4°C', '0°C', '100°C', '25°C'),
            q('Bridges have expansion joints to:', 'MEDIUM', 'Joints allow the bridge to expand and contract without cracking', 'Allow for thermal expansion', 'Reduce weight', 'Improve appearance', 'Increase flexibility in wind'),
            q('The coefficient of linear expansion α has units of:', 'MEDIUM', 'α = ΔL/(LΔT), so units are 1/K or K⁻¹', 'K⁻¹ (or °C⁻¹)', 'm/K', 'K/m', 'J/K'),
            q('A bimetallic strip bends because:', 'HARD', 'The two metals have different expansion coefficients', 'The two metals expand at different rates', 'One metal is heavier', 'They have different melting points', 'One conducts heat better'),
          ],
        },
        {
          name: 'Kinetic Theory', description: 'Microscopic view of temperature and pressure', isFree: false, entryPrice: 150,
          contents: [
            c('Kinetic Theory of Gases', 'ARTICLE', 'Gas pressure arises from molecular collisions with container walls. Temperature is proportional to average kinetic energy: KE_avg = (3/2)kT, where k is Boltzmann\'s constant.', 'The molecular origin of pressure and temperature'),
            c('Maxwell-Boltzmann Distribution', 'ARTICLE', 'The Maxwell-Boltzmann distribution describes the spread of molecular speeds in a gas. Higher temperature broadens the distribution and shifts the peak to higher speeds.', 'The statistical distribution of molecular speeds'),
          ],
          questions: [
            q('Gas pressure is caused by:', 'EASY', 'Molecules hitting the container walls exert force', 'Molecular collisions with container walls', 'Gravity pulling gas down', 'Chemical reactions', 'Electromagnetic forces'),
            q('Temperature is proportional to the average ___ of gas molecules:', 'EASY', 'KE_avg = (3/2)kT', 'Kinetic energy', 'Potential energy', 'Mass', 'Size'),
            q('Boltzmann\'s constant k relates energy to:', 'MEDIUM', 'k = R/Nₐ connects macroscopic R to per-molecule energy', 'Temperature at the molecular level', 'Pressure and volume', 'Entropy and enthalpy', 'Work and heat'),
            q('At higher temperatures, the Maxwell-Boltzmann distribution:', 'MEDIUM', 'Higher T = broader distribution, higher average speed', 'Broadens and shifts to higher speeds', 'Narrows', 'Stays the same', 'Becomes negative'),
            q('The average kinetic energy of a gas depends on temperature and:', 'HARD', 'KE_avg = (3/2)kT — it depends ONLY on temperature, not on molecular mass', 'Nothing else — only temperature', 'Molecular mass', 'Pressure', 'Volume'),
          ],
        },
      ],
    },
    {
      name: 'Electromagnetism',
      description: 'Electric and magnetic fields and their interactions',
      houses: [
        {
          name: 'Electric Fields', description: 'Coulomb\'s law and electric field lines', isFree: true, entryPrice: null,
          contents: [
            c('Electric Charge and Coulomb\'s Law', 'ARTICLE', 'Electric charge comes in positive and negative. Like charges repel, opposite attract. Coulomb\'s law: F = kq₁q₂/r². The constant k ≈ 8.99 × 10⁹ N·m²/C².', 'The force between electric charges'),
            c('Electric Field Concept', 'ARTICLE', 'An electric field E = F/q represents the force per unit charge at any point. Field lines point away from positive charges and toward negative charges.', 'Visualizing and calculating electric fields'),
          ],
          questions: [
            q('Like charges:', 'EASY', 'Same-sign charges push each other apart', 'Repel', 'Attract', 'Have no interaction', 'Cancel out'),
            q('The unit of electric charge is:', 'EASY', 'Charge is measured in Coulombs (C)', 'Coulomb', 'Volt', 'Ampere', 'Ohm'),
            q('If the distance between two charges is tripled, the force becomes:', 'MEDIUM', 'F ∝ 1/r²: tripling r gives 1/9 the force', '1/9 as strong', '1/3 as strong', '3 times as strong', '9 times as strong'),
            q('Electric field lines point:', 'MEDIUM', 'By convention, field lines go from + to -', 'Away from positive, toward negative', 'Toward positive, away from negative', 'Always upward', 'In circles'),
            q('The electric field inside a conductor in electrostatic equilibrium is:', 'HARD', 'Charges redistribute until the internal field is zero', 'Zero', 'Maximum', 'Equal to the surface field', 'Undefined'),
          ],
        },
        {
          name: 'Circuits', description: 'Current, voltage, resistance, and Ohm\'s law', isFree: true, entryPrice: null,
          contents: [
            c('Ohm\'s Law', 'ARTICLE', 'Ohm\'s law states V = IR: voltage equals current times resistance. This fundamental relationship governs the behavior of most electrical circuits.', 'The basic law of electrical circuits'),
            c('Series and Parallel Circuits', 'ARTICLE', 'In series, current is the same and voltages add. In parallel, voltage is the same and currents add. Resistors in series add directly; in parallel, reciprocals add.', 'Two fundamental circuit configurations'),
          ],
          questions: [
            q('In V = IR, I represents:', 'EASY', 'I is the current in amperes', 'Current', 'Voltage', 'Resistance', 'Power'),
            q('The unit of resistance is:', 'EASY', 'Resistance is measured in Ohms (Ω)', 'Ohm (Ω)', 'Volt (V)', 'Ampere (A)', 'Watt (W)'),
            q('Two 10Ω resistors in series have total resistance:', 'MEDIUM', 'In series: R_total = R₁ + R₂ = 20Ω', '20Ω', '5Ω', '10Ω', '100Ω'),
            q('Two 10Ω resistors in parallel have total resistance:', 'MEDIUM', '1/R = 1/10 + 1/10 = 2/10, R = 5Ω', '5Ω', '20Ω', '10Ω', '0.2Ω'),
            q('Power dissipated in a resistor is:', 'HARD', 'P = IV = I²R = V²/R', 'P = I²R (or V²/R or IV)', 'P = IR', 'P = V/I', 'P = R/I²'),
          ],
        },
        {
          name: 'Magnetism', description: 'Magnetic fields, forces, and magnetic materials', isFree: false, entryPrice: 100,
          contents: [
            c('Magnetic Fields', 'ARTICLE', 'Magnetic fields are produced by moving charges and magnets. The field is represented by B and measured in Tesla. Magnetic field lines form closed loops from north to south poles.', 'Sources and properties of magnetic fields'),
            c('Force on Moving Charges', 'ARTICLE', 'A charge q moving with velocity v in field B experiences force F = qv × B. The force is perpendicular to both v and B, causing circular or helical motion.', 'How magnetic fields affect moving charges'),
          ],
          questions: [
            q('The SI unit of magnetic field is:', 'EASY', 'Magnetic field B is measured in Tesla (T)', 'Tesla', 'Gauss', 'Weber', 'Henry'),
            q('Magnetic field lines:', 'EASY', 'Unlike electric field lines, magnetic lines always form closed loops', 'Form closed loops', 'Start and end at charges', 'Are always straight', 'Point from south to north outside'),
            q('The force on a moving charge in a magnetic field is:', 'MEDIUM', 'F = qvBsin(θ), perpendicular to both v and B', 'Perpendicular to both velocity and field', 'Parallel to the field', 'Opposite to velocity', 'Zero'),
            q('A current-carrying wire in a magnetic field experiences:', 'MEDIUM', 'F = ILBsin(θ) — the basis of electric motors', 'A force', 'No effect', 'A change in resistance', 'Heating only'),
            q('An electron moving parallel to a magnetic field experiences:', 'HARD', 'F = qvBsin(θ); when θ = 0° (parallel), sin(0) = 0, so F = 0', 'No magnetic force', 'Maximum force', 'Half the maximum force', 'A constant deceleration'),
          ],
        },
        {
          name: 'Electromagnetic Waves', description: 'Light and the electromagnetic spectrum', isFree: false, entryPrice: 80,
          contents: [
            c('The Electromagnetic Spectrum', 'ARTICLE', 'EM waves range from radio (longest wavelength) through microwave, infrared, visible, ultraviolet, X-ray, to gamma rays (shortest wavelength). All travel at c = 3 × 10⁸ m/s in vacuum.', 'The full range of electromagnetic radiation'),
            c('Properties of EM Waves', 'ARTICLE', 'EM waves are transverse waves with oscillating electric and magnetic fields perpendicular to each other and to the direction of propagation. They require no medium.', 'How electromagnetic waves propagate'),
          ],
          questions: [
            q('All electromagnetic waves travel at ___ in vacuum:', 'EASY', 'c = 3 × 10⁸ m/s, the speed of light', 'The speed of light', 'The speed of sound', 'Different speeds', 'Infinite speed'),
            q('Which has the longest wavelength?', 'EASY', 'Radio waves have wavelengths from meters to kilometers', 'Radio waves', 'Gamma rays', 'X-rays', 'Visible light'),
            q('The relationship between wavelength and frequency is:', 'MEDIUM', 'c = λf, so wavelength and frequency are inversely related', 'c = λf (inversely proportional)', 'λ = cf', 'λ + f = c', 'λf = 1'),
            q('Visible light wavelength range is approximately:', 'MEDIUM', 'Visible light spans roughly 400 nm (violet) to 700 nm (red)', '400–700 nm', '100–400 nm', '700–1000 nm', '1–100 nm'),
            q('EM waves differ from mechanical waves because they:', 'HARD', 'EM waves can travel through vacuum; mechanical waves need a medium', 'Don\'t require a medium', 'Are always longitudinal', 'Travel slower', 'Can\'t be reflected'),
          ],
        },
        {
          name: 'Electromagnetic Induction', description: 'Faraday\'s law and generators', isFree: true, entryPrice: null,
          contents: [
            c('Faraday\'s Law', 'ARTICLE', 'A changing magnetic flux through a loop induces an EMF: ε = -dΦ/dt. This is the basis of generators, transformers, and wireless charging.', 'How changing magnetic fields create electric fields'),
            c('Lenz\'s Law', 'ARTICLE', 'Lenz\'s law states that the induced current opposes the change that produced it. The negative sign in Faraday\'s law reflects this opposition, conserving energy.', 'The direction of induced current'),
          ],
          questions: [
            q('Faraday\'s law relates induced EMF to:', 'EASY', 'EMF is induced by changing magnetic flux', 'Changing magnetic flux', 'Static electric fields', 'Constant current', 'Gravity'),
            q('A generator converts:', 'EASY', 'Generators convert mechanical energy to electrical energy via induction', 'Mechanical energy to electrical energy', 'Electrical to mechanical', 'Heat to light', 'Chemical to heat'),
            q('Lenz\'s law states the induced current:', 'MEDIUM', 'The induced current opposes the change in flux that caused it', 'Opposes the change that produced it', 'Enhances the change', 'Is always clockwise', 'Is always zero'),
            q('The unit of magnetic flux is:', 'MEDIUM', 'Φ = BA, measured in Weber (Wb = T·m²)', 'Weber', 'Tesla', 'Farad', 'Henry'),
            q('If a 100-turn coil experiences a flux change of 0.5 Wb in 0.1 s, the induced EMF is:', 'HARD', 'ε = NΔΦ/Δt = 100 × 0.5 / 0.1 = 500 V', '500 V', '50 V', '5 V', '5000 V'),
          ],
        },
      ],
    },
    {
      name: 'Optics',
      description: 'The behavior and properties of light',
      houses: [
        {
          name: 'Reflection', description: 'Mirrors and the law of reflection', isFree: true, entryPrice: null,
          contents: [
            c('Law of Reflection', 'ARTICLE', 'The angle of incidence equals the angle of reflection, measured from the normal to the surface. This applies to all reflecting surfaces, from flat mirrors to curved ones.', 'How light bounces off surfaces'),
            c('Types of Mirrors', 'ARTICLE', 'Plane mirrors create virtual, upright, same-size images. Concave mirrors can create real or virtual images depending on object distance. Convex mirrors always create smaller virtual images.', 'Flat, concave, and convex mirrors'),
          ],
          questions: [
            q('The angle of incidence equals the angle of:', 'EASY', 'The law of reflection: θᵢ = θᵣ', 'Reflection', 'Refraction', 'Diffraction', 'Absorption'),
            q('A plane mirror produces an image that is:', 'EASY', 'Plane mirrors create virtual, upright images of the same size', 'Virtual and upright', 'Real and inverted', 'Magnified', 'Diminished'),
            q('Concave mirrors can produce:', 'MEDIUM', 'Depending on object position, concave mirrors can produce real or virtual images', 'Both real and virtual images', 'Only virtual images', 'Only real images', 'No images'),
            q('A convex mirror always produces:', 'MEDIUM', 'Convex mirrors diverge light, always creating smaller virtual images', 'A smaller, virtual, upright image', 'A larger, real image', 'An inverted image', 'No image'),
            q('The mirror equation is:', 'HARD', '1/f = 1/do + 1/di, relating focal length to object and image distances', '1/f = 1/dₒ + 1/dᵢ', 'f = dₒ + dᵢ', 'f = dₒ × dᵢ', '1/f = 1/dₒ - 1/dᵢ'),
          ],
        },
        {
          name: 'Refraction', description: 'Snell\'s law and light bending', isFree: true, entryPrice: null,
          contents: [
            c('Snell\'s Law', 'ARTICLE', 'When light passes between media of different densities, it bends. Snell\'s law: n₁sin(θ₁) = n₂sin(θ₂), where n is the refractive index.', 'How light bends at interfaces'),
            c('Total Internal Reflection', 'ARTICLE', 'When light travels from a denser to a less dense medium at an angle greater than the critical angle, it is completely reflected. This is the principle behind fiber optics.', 'When light cannot escape a medium'),
          ],
          questions: [
            q('The refractive index of vacuum is:', 'EASY', 'By definition, n = 1 for vacuum', '1', '0', '1.5', '∞'),
            q('Light bends toward the normal when entering a ___ medium:', 'EASY', 'Going to higher n (denser): light bends toward normal', 'Denser (higher n)', 'Less dense', 'Same density', 'Any medium'),
            q('The critical angle exists when light goes from:', 'MEDIUM', 'Total internal reflection only occurs from denser to less dense medium', 'A denser to a less dense medium', 'A less dense to denser medium', 'Any interface', 'Vacuum to glass'),
            q('A diamond\'s sparkle is due to its:', 'MEDIUM', 'Diamond has a very high refractive index (n ≈ 2.42), causing strong bending and total internal reflection', 'High refractive index', 'Low density', 'Crystal structure only', 'Color'),
            q('If n₁ = 1.5 and θ₁ = 30°, and n₂ = 1, then sin(θ₂) = ?', 'HARD', 'n₁sin(θ₁) = n₂sin(θ₂): 1.5 × 0.5 = 1 × sin(θ₂), sin(θ₂) = 0.75', '0.75', '0.5', '1.0', '0.33'),
          ],
        },
        {
          name: 'Lenses', description: 'Converging and diverging lenses', isFree: false, entryPrice: 80,
          contents: [
            c('Types of Lenses', 'ARTICLE', 'Converging (convex) lenses are thicker in the middle and focus parallel light. Diverging (concave) lenses are thinner in the middle and spread light apart.', 'How lenses bend light'),
            c('The Lens Equation', 'ARTICLE', 'The thin lens equation 1/f = 1/do + 1/di is identical to the mirror equation. Magnification m = -di/do gives image size and orientation.', 'Calculating image properties with lenses'),
          ],
          questions: [
            q('A converging lens is:', 'EASY', 'Converging = convex, thicker in the middle', 'Thicker in the middle (convex)', 'Thinner in the middle', 'Flat', 'Cylindrical'),
            q('Parallel light rays through a converging lens meet at the:', 'EASY', 'The focal point is where parallel rays converge', 'Focal point', 'Center of the lens', 'Edge of the lens', 'Infinity'),
            q('A diverging lens always produces:', 'MEDIUM', 'Diverging lenses spread light, creating virtual upright reduced images', 'Virtual, upright, reduced images', 'Real, inverted images', 'Magnified images', 'No images'),
            q('If f = 10 cm and do = 20 cm, where is the image?', 'MEDIUM', '1/10 = 1/20 + 1/di → 1/di = 1/10 - 1/20 = 1/20 → di = 20 cm', '20 cm on the other side', '10 cm', '40 cm', '5 cm'),
            q('Magnification m = -2 means the image is:', 'HARD', 'Negative magnification = inverted; |m| = 2 means twice the size', 'Inverted and twice as large', 'Upright and twice as large', 'Inverted and half as large', 'Upright and half as large'),
          ],
        },
        {
          name: 'Wave Optics', description: 'Interference, diffraction, and polarization', isFree: false, entryPrice: 120,
          contents: [
            c('Interference', 'ARTICLE', 'When two coherent light waves overlap, they create interference patterns. Constructive interference (bright) occurs when path difference is a whole number of wavelengths; destructive (dark) when half a wavelength.', 'How light waves combine'),
            c('Diffraction', 'ARTICLE', 'Light bends around obstacles and through narrow slits, creating diffraction patterns. Single-slit diffraction produces a central bright maximum flanked by weaker fringes.', 'Light bending around edges'),
          ],
          questions: [
            q('Constructive interference occurs when waves are:', 'EASY', 'In phase = crests align = constructive', 'In phase', 'Out of phase', 'At different frequencies', 'Perpendicular'),
            q('The double-slit experiment demonstrates light\'s:', 'EASY', 'Young\'s experiment proved light behaves as a wave', 'Wave nature', 'Particle nature', 'Mass', 'Speed'),
            q('Diffraction is most noticeable when the slit width is:', 'MEDIUM', 'Diffraction is most prominent when aperture ≈ wavelength', 'Close to the wavelength of light', 'Much larger than wavelength', 'Much smaller than wavelength', 'Zero'),
            q('Polarized light vibrates in:', 'MEDIUM', 'Polarization restricts vibration to one plane', 'One plane only', 'All planes equally', 'Circles', 'Random changing planes'),
            q('In Young\'s experiment, fringe spacing increases when:', 'HARD', 'Δy = λL/d: spacing increases with wavelength or screen distance, decreases with slit spacing', 'Wavelength increases or slit spacing decreases', 'Wavelength decreases', 'Slit spacing increases', 'Screen distance decreases'),
          ],
        },
        {
          name: 'Optical Instruments', description: 'Microscopes, telescopes, and cameras', isFree: true, entryPrice: null,
          contents: [
            c('Microscopes and Telescopes', 'ARTICLE', 'Compound microscopes use two converging lenses to magnify small objects. Refracting telescopes also use two lenses but are designed for distant objects. Both rely on the lens equation.', 'How optical instruments magnify'),
            c('The Human Eye', 'ARTICLE', 'The eye focuses light with a flexible lens onto the retina. Nearsightedness (myopia) is corrected with diverging lenses, and farsightedness (hyperopia) with converging lenses.', 'Optics of vision and corrective lenses'),
          ],
          questions: [
            q('A compound microscope uses ___ lens(es):', 'EASY', 'It uses an objective lens and an eyepiece (2 lenses)', 'Two', 'One', 'Three', 'Four'),
            q('Myopia (nearsightedness) is corrected with:', 'EASY', 'Diverging (concave) lenses reduce the focusing power', 'Diverging lenses', 'Converging lenses', 'Prisms', 'Mirrors'),
            q('A camera lens focuses light onto:', 'MEDIUM', 'In digital cameras, light hits a sensor (or film in analog cameras)', 'A sensor or film', 'A mirror', 'Another lens', 'The viewfinder'),
            q('Astronomical telescopes have large objectives to:', 'MEDIUM', 'Larger aperture collects more light, revealing fainter objects', 'Gather more light', 'Reduce weight', 'Focus closer', 'Reduce color'),
            q('The angular magnification of a simple magnifier is approximately:', 'HARD', 'M ≈ 25 cm / f, where 25 cm is the near point distance', '25 cm / f', 'f / 25 cm', '25 × f', '1 / f'),
          ],
        },
      ],
    },
    {
      name: 'Modern Physics',
      description: 'Relativity, quantum mechanics, and nuclear physics',
      houses: [
        {
          name: 'Special Relativity', description: 'Einstein\'s theory for objects near light speed', isFree: true, entryPrice: null,
          contents: [
            c('Postulates of Special Relativity', 'ARTICLE', 'Einstein\'s two postulates: (1) The laws of physics are the same in all inertial frames. (2) The speed of light is constant for all observers. This leads to time dilation and length contraction.', 'The foundation of special relativity'),
            c('E = mc²', 'ARTICLE', 'Mass-energy equivalence means mass is a form of energy. A small mass corresponds to enormous energy, as seen in nuclear reactions and particle physics.', 'The most famous equation in physics'),
          ],
          questions: [
            q('The speed of light in vacuum is approximately:', 'EASY', 'c ≈ 3 × 10⁸ m/s', '3 × 10⁸ m/s', '3 × 10⁶ m/s', '3 × 10¹⁰ m/s', '3 × 10⁵ m/s'),
            q('Time dilation means a moving clock runs:', 'EASY', 'A clock in motion relative to an observer runs slower', 'Slower', 'Faster', 'At the same rate', 'Backward'),
            q('Length contraction occurs along the direction of:', 'MEDIUM', 'Objects contract along their direction of motion at high speeds', 'Motion', 'Perpendicular to motion', 'All directions equally', 'The gravitational field'),
            q('In E = mc², what does c represent?', 'MEDIUM', 'c is the speed of light in vacuum', 'Speed of light', 'Speed of sound', 'A constant of proportionality', 'Charge'),
            q('The Lorentz factor γ = 1/√(1-v²/c²) at v = 0.6c equals:', 'HARD', 'γ = 1/√(1-0.36) = 1/√0.64 = 1/0.8 = 1.25', '1.25', '0.8', '1.5', '0.6'),
          ],
        },
        {
          name: 'Quantum Mechanics', description: 'Wave-particle duality and quantized energy', isFree: false, entryPrice: 150,
          contents: [
            c('Quantization of Energy', 'ARTICLE', 'Energy is quantized at the atomic scale. Planck showed E = hf, where h is Planck\'s constant. Einstein extended this to explain the photoelectric effect with photons.', 'Energy comes in discrete packets'),
            c('The Schrödinger Equation', 'ARTICLE', 'The Schrödinger equation describes how quantum states evolve. Its solutions give probability distributions for finding particles, replacing the certainty of classical mechanics.', 'The fundamental equation of quantum mechanics'),
          ],
          questions: [
            q('Planck\'s constant h is approximately:', 'EASY', 'h ≈ 6.626 × 10⁻³⁴ J·s', '6.626 × 10⁻³⁴ J·s', '1.602 × 10⁻¹⁹ C', '9.109 × 10⁻³¹ kg', '8.314 J/(mol·K)'),
            q('A photon\'s energy is given by:', 'EASY', 'E = hf, proportional to frequency', 'E = hf', 'E = mc²', 'E = ½mv²', 'E = kT'),
            q('The photoelectric effect shows light acts as:', 'MEDIUM', 'Einstein explained it by treating light as particles (photons)', 'Particles (photons)', 'Only waves', 'Sound', 'Static fields'),
            q('The uncertainty principle relates position uncertainty to:', 'MEDIUM', 'ΔxΔp ≥ ℏ/2: more certain position means less certain momentum', 'Momentum uncertainty', 'Energy uncertainty', 'Time uncertainty', 'Mass uncertainty'),
            q('An electron in a box has quantized energy levels proportional to:', 'HARD', 'Eₙ = n²h²/(8mL²), proportional to n²', 'n² (quantum number squared)', 'n', '1/n²', 'n³'),
          ],
        },
        {
          name: 'Nuclear Physics', description: 'Radioactivity, fission, and fusion', isFree: true, entryPrice: null,
          contents: [
            c('Radioactive Decay', 'ARTICLE', 'Unstable nuclei emit radiation: alpha (helium nucleus), beta (electron or positron), or gamma (high-energy photon). Each type has different penetrating power and ionizing ability.', 'Types of nuclear radiation'),
            c('Fission and Fusion', 'ARTICLE', 'Fission splits heavy nuclei (like uranium), releasing energy in nuclear reactors. Fusion combines light nuclei (like hydrogen), powering the Sun. Both release energy due to mass-energy equivalence.', 'Nuclear energy: splitting and combining atoms'),
          ],
          questions: [
            q('Alpha radiation consists of:', 'EASY', 'Alpha particles = 2 protons + 2 neutrons (helium nucleus)', 'Helium nuclei', 'Electrons', 'Photons', 'Neutrons'),
            q('Which radiation type has the most penetrating power?', 'EASY', 'Gamma rays penetrate the most; alpha the least', 'Gamma', 'Alpha', 'Beta', 'All equal'),
            q('Nuclear fission involves:', 'MEDIUM', 'Heavy atoms splitting into lighter atoms with energy release', 'Splitting heavy nuclei', 'Combining light nuclei', 'Chemical reactions', 'Electron emission only'),
            q('The half-life of a radioactive isotope is the time for ___ of the sample to decay:', 'MEDIUM', 'Half-life = time for 50% of atoms to decay', 'Half', 'All', 'One-quarter', 'One-tenth'),
            q('The Sun\'s energy comes primarily from:', 'HARD', 'The Sun fuses hydrogen into helium in its core', 'Hydrogen fusion', 'Uranium fission', 'Chemical combustion', 'Gravitational collapse only'),
          ],
        },
        {
          name: 'Particle Physics', description: 'Quarks, leptons, and fundamental forces', isFree: false, entryPrice: 200,
          contents: [
            c('The Standard Model', 'ARTICLE', 'The Standard Model describes all known fundamental particles: 6 quarks, 6 leptons, and force-carrying bosons (photon, W/Z, gluon, Higgs). It does not include gravity.', 'The complete theory of fundamental particles'),
            c('Quarks and Hadrons', 'ARTICLE', 'Quarks combine in groups: three quarks make baryons (protons, neutrons), and quark-antiquark pairs make mesons. The strong force, carried by gluons, binds quarks together.', 'The building blocks of protons and neutrons'),
          ],
          questions: [
            q('Protons are made of:', 'EASY', 'A proton = 2 up quarks + 1 down quark (uud)', 'Two up quarks and one down quark', 'Three electrons', 'One up and two down quarks', 'Leptons'),
            q('Which particle carries the electromagnetic force?', 'EASY', 'The photon mediates electromagnetic interactions', 'Photon', 'Gluon', 'W boson', 'Graviton'),
            q('Leptons include:', 'MEDIUM', 'Electrons, muons, taus, and their neutrinos are all leptons', 'Electrons and neutrinos', 'Protons and neutrons', 'Quarks', 'Photons and gluons'),
            q('The Higgs boson is responsible for:', 'MEDIUM', 'The Higgs field gives particles their mass', 'Giving particles mass', 'Carrying the strong force', 'Electromagnetic radiation', 'Gravity'),
            q('How many flavors of quarks exist?', 'HARD', 'Up, down, charm, strange, top, bottom = 6 flavors', '6', '3', '4', '8'),
          ],
        },
        {
          name: 'Cosmology', description: 'The origin and structure of the universe', isFree: true, entryPrice: null,
          contents: [
            c('The Big Bang', 'ARTICLE', 'The Big Bang theory states the universe began from an extremely hot, dense singularity about 13.8 billion years ago. Evidence includes the cosmic microwave background and redshift of galaxies.', 'The origin of the universe'),
            c('Dark Matter and Dark Energy', 'ARTICLE', 'Ordinary matter makes up only about 5% of the universe. Dark matter (~27%) explains galaxy rotation curves, and dark energy (~68%) drives the accelerating expansion.', 'The invisible majority of the cosmos'),
          ],
          questions: [
            q('The age of the universe is approximately:', 'EASY', 'Measured from CMB data and expansion rate', '13.8 billion years', '4.6 billion years', '1 billion years', '100 billion years'),
            q('The Big Bang theory is supported by:', 'EASY', 'CMB radiation, discovered in 1965, is a key piece of evidence', 'Cosmic microwave background radiation', 'Steady-state observations', 'Dark energy only', 'Planetary motion'),
            q('Hubble\'s law states that more distant galaxies:', 'MEDIUM', 'v = H₀d: recession velocity is proportional to distance', 'Recede faster', 'Are closer together', 'Are older', 'Have less mass'),
            q('Dark matter is detected indirectly through:', 'MEDIUM', 'Dark matter reveals itself through extra gravitational effects', 'Its gravitational effects', 'Its light emission', 'Radio waves', 'Chemical reactions'),
            q('The accelerating expansion of the universe is attributed to:', 'HARD', 'Dark energy acts as a repulsive force on cosmic scales', 'Dark energy', 'Dark matter', 'Gravity', 'Radiation pressure'),
          ],
        },
      ],
    },
  ],
};
// ─── COMPUTER SCIENCE ────────────────────────────────────────

const computerScience: SeedKingdom = {
  name: 'Computer Science',
  description: 'The kingdom of computation, algorithms, and digital systems',
  villages: [
    {
      name: 'Data Structures',
      description: 'Organizing and storing data efficiently',
      houses: [
        { name: 'Arrays and Lists', description: 'Sequential data storage and linked structures', isFree: true, entryPrice: null,
          contents: [
            c('Arrays vs Linked Lists', 'ARTICLE', 'Arrays store elements contiguously in memory for O(1) random access. Linked lists use nodes with pointers, offering O(1) insertion/deletion but O(n) access.', 'Comparing sequential storage approaches'),
            c('Dynamic Arrays', 'ARTICLE', 'Dynamic arrays (like ArrayList or Vec) grow automatically by doubling capacity when full. This gives amortized O(1) append but O(n) worst-case for a single append that triggers reallocation.', 'How resizable arrays work internally'),
          ],
          questions: [
            q('Array access by index is:', 'EASY', 'Arrays provide constant-time access via pointer arithmetic', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)'),
            q('Linked list insertion at the head is:', 'EASY', 'Just create a new node and update the head pointer', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)'),
            q('Which operation is O(n) for arrays?', 'MEDIUM', 'Inserting at the beginning requires shifting all elements', 'Insert at the beginning', 'Access by index', 'Access the last element', 'Get length'),
            q('A doubly linked list differs from singly linked by having:', 'MEDIUM', 'Each node has pointers to both next and previous nodes', 'Previous and next pointers', 'Two data fields', 'Two heads', 'Circular structure'),
            q('The amortized cost of appending to a dynamic array is:', 'HARD', 'Doubling strategy: most appends are O(1), rare O(n) resize averages out', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)'),
          ],
        },
        { name: 'Trees', description: 'Hierarchical data structures', isFree: true, entryPrice: null,
          contents: [
            c('Binary Trees', 'ARTICLE', 'A binary tree has nodes with at most two children. A binary search tree (BST) maintains the property: left child < parent < right child, enabling efficient searching.', 'Hierarchical data organization'),
            c('Balanced Trees', 'ARTICLE', 'AVL trees and red-black trees self-balance after insertions and deletions, guaranteeing O(log n) operations. Without balancing, a BST can degrade to a linked list.', 'Keeping search trees efficient'),
          ],
          questions: [
            q('A binary tree node has at most ___ children:', 'EASY', 'Binary means two', '2', '1', '3', 'Unlimited'),
            q('In a BST, all left subtree values are:', 'EASY', 'BST property: left < root < right', 'Less than the root', 'Greater than the root', 'Equal to the root', 'Random'),
            q('The height of a balanced BST with n nodes is:', 'MEDIUM', 'Balanced trees have height O(log n)', 'O(log n)', 'O(n)', 'O(1)', 'O(n²)'),
            q('A tree traversal that visits root, then left, then right is:', 'MEDIUM', 'Pre-order: root → left → right', 'Pre-order', 'In-order', 'Post-order', 'Level-order'),
            q('The worst-case search in an unbalanced BST is:', 'HARD', 'A skewed BST becomes a linked list: O(n)', 'O(n)', 'O(log n)', 'O(1)', 'O(n log n)'),
          ],
        },
        { name: 'Graphs', description: 'Networks of nodes and edges', isFree: false, entryPrice: 100,
          contents: [
            c('Graph Representations', 'ARTICLE', 'Graphs can be stored as adjacency matrices (O(V²) space, O(1) edge lookup) or adjacency lists (O(V+E) space, efficient for sparse graphs). The choice depends on graph density.', 'How to store graphs in memory'),
            c('Graph Traversal', 'ARTICLE', 'BFS uses a queue and explores level by level, finding shortest paths in unweighted graphs. DFS uses a stack (or recursion) and explores as deep as possible before backtracking.', 'BFS and DFS algorithms'),
          ],
          questions: [
            q('A graph with directed edges is called:', 'EASY', 'Directed graph = digraph: edges have direction', 'Directed graph (digraph)', 'Undirected graph', 'Weighted graph', 'Complete graph'),
            q('BFS uses which data structure?', 'EASY', 'BFS explores level-by-level using a queue (FIFO)', 'Queue', 'Stack', 'Heap', 'Array'),
            q('Adjacency list space complexity is:', 'MEDIUM', 'O(V + E) — one entry per vertex plus one per edge', 'O(V + E)', 'O(V²)', 'O(E²)', 'O(V)'),
            q('DFS can detect ___ in a directed graph:', 'MEDIUM', 'A back edge during DFS indicates a cycle', 'Cycles', 'Shortest paths', 'Minimum spanning trees', 'Connected components only'),
            q('Dijkstra\'s algorithm finds shortest paths in graphs with:', 'HARD', 'Dijkstra requires non-negative edge weights; use Bellman-Ford for negative', 'Non-negative edge weights', 'Any edge weights', 'No edge weights', 'Only unit weights'),
          ],
        },
        { name: 'Hash Tables', description: 'Key-value storage with fast lookups', isFree: false, entryPrice: 80,
          contents: [
            c('Hashing Fundamentals', 'ARTICLE', 'Hash tables map keys to indices using a hash function. Average case lookup, insert, and delete are all O(1). Collisions are handled by chaining or open addressing.', 'Fast key-value data access'),
            c('Collision Resolution', 'ARTICLE', 'Chaining stores colliding entries in a linked list at each index. Open addressing probes for the next empty slot (linear, quadratic, or double hashing).', 'Handling hash collisions'),
          ],
          questions: [
            q('Average hash table lookup time is:', 'EASY', 'With a good hash function and low load factor: O(1)', 'O(1)', 'O(n)', 'O(log n)', 'O(n²)'),
            q('A hash function maps keys to:', 'EASY', 'It converts any key to an array index', 'Array indices', 'Sorted order', 'Linked lists', 'Trees'),
            q('In chaining, collisions are resolved by:', 'MEDIUM', 'Each bucket holds a linked list of entries', 'Storing colliding elements in a linked list', 'Rehashing the entire table', 'Deleting the old entry', 'Using a tree'),
            q('The load factor of a hash table is:', 'MEDIUM', 'Load factor = n/m (number of entries / table size)', 'Number of entries divided by table size', 'Table size divided by entries', 'Hash function output', 'Number of collisions'),
            q('Worst-case hash table lookup is:', 'HARD', 'If all keys hash to the same bucket: O(n)', 'O(n)', 'O(1)', 'O(log n)', 'O(n log n)'),
          ],
        },
        { name: 'Heaps', description: 'Priority queues and heap sort', isFree: true, entryPrice: null,
          contents: [
            c('Binary Heaps', 'ARTICLE', 'A binary heap is a complete binary tree where each parent is ≤ (min-heap) or ≥ (max-heap) its children. It supports O(log n) insert and O(log n) extract-min/max.', 'Efficient priority queue implementation'),
            c('Heap Applications', 'ARTICLE', 'Heaps are used in priority queues, heap sort (O(n log n) in-place), Dijkstra\'s algorithm, and finding the kth largest element. Building a heap from n elements is O(n).', 'Where heaps are used in practice'),
          ],
          questions: [
            q('In a min-heap, the root contains:', 'EASY', 'Min-heap property: parent ≤ children, so root is smallest', 'The minimum element', 'The maximum element', 'The median', 'A random element'),
            q('Inserting into a heap takes:', 'EASY', 'Insert at the end and bubble up: O(log n)', 'O(log n)', 'O(1)', 'O(n)', 'O(n²)'),
            q('Heap sort time complexity is:', 'MEDIUM', 'Build heap O(n), then n × extract-min O(log n) = O(n log n)', 'O(n log n)', 'O(n²)', 'O(n)', 'O(log n)'),
            q('A binary heap is stored efficiently as:', 'MEDIUM', 'Complete tree can be stored in an array: children of i are at 2i+1, 2i+2', 'An array', 'A linked list', 'A hash table', 'A graph'),
            q('Building a heap from n elements (heapify) is:', 'HARD', 'Sift-down from bottom: O(n), NOT O(n log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'),
          ],
        },
      ],
    },
    {
      name: 'Algorithms',
      description: 'Sorting, searching, and optimization techniques',
      houses: [
        { name: 'Sorting', description: 'Algorithms for ordering data', isFree: true, entryPrice: null,
          contents: [
            c('Comparison Sorts', 'ARTICLE', 'Merge sort and quicksort are O(n log n) average. Merge sort is stable and always O(n log n) but uses O(n) extra space. Quicksort is in-place but O(n²) worst case.', 'Efficient comparison-based sorting'),
            c('Non-Comparison Sorts', 'ARTICLE', 'Counting sort, radix sort, and bucket sort can achieve O(n) time by not comparing elements. They work best on integers or strings with bounded range.', 'Linear-time sorting algorithms'),
          ],
          questions: [
            q('Bubble sort has worst-case time complexity:', 'EASY', 'Bubble sort compares adjacent elements repeatedly: O(n²)', 'O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'),
            q('Merge sort is:', 'EASY', 'Merge sort always divides in half and merges: stable O(n log n)', 'O(n log n) and stable', 'O(n²) and unstable', 'O(n) and stable', 'O(n log n) and unstable'),
            q('Quicksort\'s worst case occurs when:', 'MEDIUM', 'Already sorted data with bad pivot choice gives O(n²)', 'The pivot is always the smallest or largest element', 'The data is random', 'There are duplicates', 'The data is very large'),
            q('The lower bound for comparison-based sorting is:', 'MEDIUM', 'Any comparison sort must make Ω(n log n) comparisons', 'Ω(n log n)', 'Ω(n)', 'Ω(n²)', 'Ω(log n)'),
            q('Counting sort runs in O(n + k) where k is:', 'HARD', 'k is the range of input values', 'The range of input values', 'The number of comparisons', 'The array size', 'The recursion depth'),
          ],
        },
        { name: 'Searching', description: 'Finding elements in data structures', isFree: true, entryPrice: null,
          contents: [
            c('Linear vs Binary Search', 'ARTICLE', 'Linear search checks each element: O(n). Binary search requires sorted data and halves the search space each step: O(log n). Binary search is fundamental to efficient computing.', 'Two fundamental search strategies'),
            c('Search in Practice', 'ARTICLE', 'Real-world search uses indexes (B-trees in databases), hash tables (dictionaries), and specialized structures (tries for strings, spatial trees for geographic data).', 'Search algorithms in real applications'),
          ],
          questions: [
            q('Binary search requires the data to be:', 'EASY', 'Binary search only works on sorted data', 'Sorted', 'Unsorted', 'In a linked list', 'In a hash table'),
            q('Binary search time complexity is:', 'EASY', 'Halving each step: O(log n)', 'O(log n)', 'O(n)', 'O(1)', 'O(n²)'),
            q('Linear search on a linked list takes:', 'MEDIUM', 'Must traverse from head: O(n)', 'O(n)', 'O(log n)', 'O(1)', 'O(n log n)'),
            q('Binary search on 1024 elements needs at most ___ comparisons:', 'MEDIUM', 'log₂(1024) = 10', '10', '1024', '100', '32'),
            q('Interpolation search is faster than binary search when:', 'HARD', 'For uniformly distributed data, it achieves O(log log n)', 'Data is uniformly distributed', 'Data is sorted in reverse', 'Data has duplicates', 'Data is unsorted'),
          ],
        },
        { name: 'Dynamic Programming', description: 'Solving problems by breaking into overlapping subproblems', isFree: false, entryPrice: 150,
          contents: [
            c('DP Fundamentals', 'ARTICLE', 'Dynamic programming solves problems with overlapping subproblems and optimal substructure. It stores subproblem solutions (memoization or tabulation) to avoid redundant computation.', 'The core idea behind dynamic programming'),
            c('Classic DP Problems', 'ARTICLE', 'Classic DP problems include Fibonacci (O(n) vs O(2ⁿ) naive), knapsack, longest common subsequence, and edit distance. Identifying the recurrence relation is the key step.', 'Famous problems solved with DP'),
          ],
          questions: [
            q('DP improves over naive recursion by:', 'EASY', 'DP stores computed results to avoid recomputation', 'Storing computed subproblem results', 'Using more memory', 'Sorting first', 'Parallelizing'),
            q('The Fibonacci sequence can be computed in ___ time with DP:', 'EASY', 'Store previous two values: O(n) instead of O(2ⁿ)', 'O(n)', 'O(2ⁿ)', 'O(n²)', 'O(log n)'),
            q('Memoization is a ___ approach:', 'MEDIUM', 'Memoization caches results of recursive calls: top-down', 'Top-down', 'Bottom-up', 'Greedy', 'Divide-and-conquer'),
            q('Tabulation is a ___ approach:', 'MEDIUM', 'Tabulation fills a table iteratively from base cases: bottom-up', 'Bottom-up', 'Top-down', 'Random', 'Recursive'),
            q('The 0/1 knapsack problem has time complexity:', 'HARD', 'DP solution uses a table of size n × W: O(nW)', 'O(nW) where n = items and W = capacity', 'O(n log n)', 'O(2ⁿ)', 'O(n²)'),
          ],
        },
        { name: 'Greedy Algorithms', description: 'Locally optimal choices leading to global solutions', isFree: true, entryPrice: null,
          contents: [
            c('Greedy Strategy', 'ARTICLE', 'Greedy algorithms make the locally optimal choice at each step, hoping to find a global optimum. They work when the problem has the greedy-choice property and optimal substructure.', 'When locally optimal means globally optimal'),
            c('Classic Greedy Problems', 'ARTICLE', 'Activity selection, Huffman coding, and minimum spanning trees (Kruskal\'s, Prim\'s) are classic greedy algorithms. Greedy does NOT work for all optimization problems (e.g., 0/1 knapsack).', 'Famous problems with greedy solutions'),
          ],
          questions: [
            q('A greedy algorithm always picks:', 'EASY', 'It chooses the best option at each step', 'The locally optimal choice', 'A random choice', 'The worst choice', 'All choices'),
            q('Greedy algorithms are guaranteed to be optimal for:', 'EASY', 'Only problems with greedy-choice property and optimal substructure', 'Problems with greedy-choice property', 'All optimization problems', 'NP-hard problems', 'Graph problems only'),
            q('Kruskal\'s algorithm finds:', 'MEDIUM', 'It greedily adds cheapest edges to find MST', 'Minimum spanning tree', 'Shortest path', 'Maximum flow', 'Topological order'),
            q('Huffman coding is used for:', 'MEDIUM', 'It creates optimal prefix codes for data compression', 'Data compression', 'Sorting', 'Searching', 'Graph traversal'),
            q('The greedy approach fails for the 0/1 knapsack because:', 'HARD', 'Items cannot be split; greedy by value/weight ratio may miss the optimal combination', 'Items cannot be fractionally taken', 'The problem has no substructure', 'It has too many items', 'There is no greedy choice'),
          ],
        },
        { name: 'Graph Algorithms', description: 'Shortest paths, MST, and topological sort', isFree: false, entryPrice: 120,
          contents: [
            c('Shortest Path Algorithms', 'ARTICLE', 'Dijkstra\'s algorithm finds single-source shortest paths in O((V+E) log V) with a priority queue. Bellman-Ford handles negative weights in O(VE). Floyd-Warshall finds all-pairs paths in O(V³).', 'Finding optimal routes in graphs'),
            c('Minimum Spanning Trees', 'ARTICLE', 'An MST connects all vertices with minimum total edge weight. Kruskal\'s sorts edges and uses union-find. Prim\'s grows the tree from a start vertex using a priority queue.', 'Connecting all nodes with minimum cost'),
          ],
          questions: [
            q('Dijkstra\'s algorithm does NOT work with:', 'EASY', 'Negative edge weights can cause Dijkstra to give wrong results', 'Negative edge weights', 'Directed graphs', 'Sparse graphs', 'Large graphs'),
            q('BFS finds shortest paths in ___ graphs:', 'EASY', 'BFS finds shortest paths when all edges have equal weight', 'Unweighted', 'Weighted', 'Only directed', 'Dense'),
            q('Topological sort applies to:', 'MEDIUM', 'Only DAGs have a valid topological ordering', 'Directed acyclic graphs (DAGs)', 'Any graph', 'Undirected graphs', 'Cyclic graphs'),
            q('Bellman-Ford time complexity is:', 'MEDIUM', 'V-1 iterations over all E edges: O(VE)', 'O(VE)', 'O(V²)', 'O(V + E)', 'O(V³)'),
            q('The time complexity of Prim\'s algorithm with a binary heap is:', 'HARD', 'Using a binary heap: O((V + E) log V)', 'O((V + E) log V)', 'O(V²)', 'O(E log E)', 'O(VE)'),
          ],
        },
      ],
    },
    {
      name: 'Web Development',
      description: 'Building applications for the web',
      houses: [
        { name: 'HTML and CSS', description: 'Structure and styling of web pages', isFree: true, entryPrice: null,
          contents: [
            c('HTML Fundamentals', 'ARTICLE', 'HTML provides the structure of web pages using elements like <div>, <p>, <h1>, and <a>. Semantic HTML (header, nav, main, footer) improves accessibility and SEO.', 'The building blocks of web content'),
            c('CSS Layout', 'ARTICLE', 'CSS controls visual presentation. Flexbox handles one-dimensional layouts, Grid handles two-dimensional layouts. The box model (margin, border, padding, content) governs element sizing.', 'Styling and positioning web elements'),
          ],
          questions: [
            q('HTML stands for:', 'EASY', 'HyperText Markup Language', 'HyperText Markup Language', 'High Tech Modern Language', 'Hyper Transfer Markup Logic', 'Home Tool Markup Language'),
            q('Which CSS property makes text bold?', 'EASY', 'font-weight: bold or font-weight: 700', 'font-weight', 'text-style', 'font-bold', 'text-weight'),
            q('Flexbox is best for ___ layouts:', 'MEDIUM', 'Flexbox handles one direction: row or column', 'One-dimensional', 'Two-dimensional', 'Grid-based', 'Table-based'),
            q('The CSS box model layers (inside to out) are:', 'MEDIUM', 'Content → padding → border → margin', 'Content, padding, border, margin', 'Margin, border, padding, content', 'Border, padding, content, margin', 'Content, margin, border, padding'),
            q('position: sticky combines which two position behaviors?', 'HARD', 'Sticky acts as relative until a scroll threshold, then as fixed', 'Relative and fixed', 'Absolute and relative', 'Static and fixed', 'Fixed and absolute'),
          ],
        },
        { name: 'JavaScript', description: 'The language of the web browser', isFree: true, entryPrice: null,
          contents: [
            c('JavaScript Fundamentals', 'ARTICLE', 'JavaScript is a dynamically-typed, prototype-based language. It supports first-class functions, closures, and both synchronous and asynchronous execution via the event loop.', 'Core concepts of JavaScript'),
            c('Async JavaScript', 'ARTICLE', 'JavaScript handles async operations through callbacks, Promises, and async/await. The event loop processes the call stack and message queue, enabling non-blocking I/O.', 'Asynchronous programming in JS'),
          ],
          questions: [
            q('JavaScript is a ___ typed language:', 'EASY', 'Types are checked at runtime, not compile time', 'Dynamically', 'Statically', 'Strongly', 'Not'),
            q('typeof null returns:', 'EASY', 'A famous JS bug: typeof null === "object"', '"object"', '"null"', '"undefined"', '"boolean"'),
            q('A closure is a function that:', 'MEDIUM', 'Closures capture variables from their enclosing scope', 'Retains access to its outer scope variables', 'Closes the browser', 'Cannot be called', 'Has no return value'),
            q('Promises can be in which states?', 'MEDIUM', 'Pending, fulfilled, or rejected', 'Pending, fulfilled, rejected', 'Open, closed', 'Running, stopped', 'Sync, async'),
            q('The event loop processes the ___ before the ___:', 'HARD', 'Microtasks (Promises) run before macrotasks (setTimeout)', 'Microtask queue before macrotask queue', 'Macrotask before microtask', 'Call stack before heap', 'Heap before stack'),
          ],
        },
        { name: 'React', description: 'Component-based UI library', isFree: false, entryPrice: 100,
          contents: [
            c('React Components', 'ARTICLE', 'React uses a component-based architecture where UI is divided into reusable pieces. Components can be functions or classes, accepting props and managing state.', 'Building UIs with components'),
            c('React Hooks', 'ARTICLE', 'Hooks (useState, useEffect, useContext, etc.) let function components use state and lifecycle features. They follow rules: only call at the top level, only in React functions.', 'State and effects in function components'),
          ],
          questions: [
            q('React components return:', 'EASY', 'Components return JSX that describes the UI', 'JSX', 'HTML strings', 'CSS', 'SQL'),
            q('useState returns:', 'EASY', 'A state value and a setter function', 'A value and a setter function', 'Just a value', 'A promise', 'An event handler'),
            q('useEffect runs:', 'MEDIUM', 'useEffect runs after render, handling side effects', 'After the component renders', 'Before render', 'Only once ever', 'During rendering'),
            q('Keys in lists help React:', 'MEDIUM', 'Keys help React identify which items changed for efficient re-rendering', 'Identify which items changed', 'Style list items', 'Sort the list', 'Add click handlers'),
            q('Virtual DOM improves performance by:', 'HARD', 'React diffs the virtual DOM and only updates changed real DOM nodes', 'Batching and minimizing real DOM updates', 'Replacing the real DOM entirely', 'Using web workers', 'Caching HTML'),
          ],
        },
        { name: 'APIs', description: 'Building and consuming web APIs', isFree: false, entryPrice: 80,
          contents: [
            c('REST API Design', 'ARTICLE', 'REST uses HTTP methods (GET, POST, PUT, DELETE) on resource URLs. APIs should be stateless, use proper status codes, and follow consistent naming conventions.', 'Designing RESTful web services'),
            c('GraphQL', 'ARTICLE', 'GraphQL lets clients request exactly the data they need in a single query. It uses a typed schema, resolvers, and supports queries, mutations, and subscriptions.', 'A flexible query language for APIs'),
          ],
          questions: [
            q('REST stands for:', 'EASY', 'Representational State Transfer', 'Representational State Transfer', 'Remote Execution Service Tool', 'Rapid Endpoint System Technology', 'Real-time Event Streaming Transport'),
            q('Which HTTP method retrieves data?', 'EASY', 'GET requests read data without modifying it', 'GET', 'POST', 'DELETE', 'PUT'),
            q('HTTP status code 404 means:', 'MEDIUM', '404 = the requested resource was not found', 'Not Found', 'Server Error', 'Unauthorized', 'OK'),
            q('GraphQL differs from REST by:', 'MEDIUM', 'Clients specify exactly what data they want in the query', 'Letting clients specify exact data needs', 'Using XML instead of JSON', 'Requiring multiple endpoints per resource', 'Not using HTTP'),
            q('HTTP status code 201 means:', 'HARD', '201 = a new resource was successfully created', 'Created', 'OK', 'No Content', 'Accepted'),
          ],
        },
        { name: 'Web Security', description: 'Common vulnerabilities and defenses', isFree: true, entryPrice: null,
          contents: [
            c('XSS and CSRF', 'ARTICLE', 'Cross-site scripting (XSS) injects malicious scripts via user input. Cross-site request forgery (CSRF) tricks users into making unwanted requests. Both are prevented by input sanitization and tokens.', 'Two common web attack vectors'),
            c('Authentication Security', 'ARTICLE', 'Secure auth uses hashed passwords (bcrypt), HTTPS, HttpOnly cookies, and short-lived tokens. Never store passwords in plain text or send credentials over HTTP.', 'Protecting user authentication'),
          ],
          questions: [
            q('XSS stands for:', 'EASY', 'Cross-Site Scripting', 'Cross-Site Scripting', 'XML Security System', 'Cross-Server Script', 'Extra Secure Socket'),
            q('Passwords should be stored as:', 'EASY', 'Always hash passwords; never store plain text', 'Hashed values', 'Plain text', 'Encrypted (reversible)', 'Base64 encoded'),
            q('HTTPS encrypts communication using:', 'MEDIUM', 'TLS (Transport Layer Security) encrypts the connection', 'TLS/SSL', 'SHA-256', 'Bcrypt', 'AES only'),
            q('CSRF attacks are prevented by:', 'MEDIUM', 'Anti-CSRF tokens verify the request is intentional', 'Anti-CSRF tokens', 'Longer passwords', 'HTTPS alone', 'Input validation alone'),
            q('The Content-Security-Policy header helps prevent:', 'HARD', 'CSP restricts what sources of content are allowed, mitigating XSS', 'XSS attacks', 'SQL injection', 'DDoS attacks', 'Brute force attacks'),
          ],
        },
      ],
    },
    {
      name: 'Databases',
      description: 'Storing, querying, and managing data',
      houses: [
        { name: 'SQL Fundamentals', description: 'Relational queries and data manipulation', isFree: true, entryPrice: null,
          contents: [
            c('SQL Basics', 'ARTICLE', 'SQL (Structured Query Language) is used to interact with relational databases. Core commands include SELECT (query), INSERT (add), UPDATE (modify), and DELETE (remove).', 'The language of relational databases'),
            c('Joins', 'ARTICLE', 'JOINs combine rows from two or more tables. INNER JOIN returns matching rows, LEFT JOIN includes all left rows, RIGHT JOIN all right rows, and FULL OUTER JOIN includes all rows from both.', 'Combining data from multiple tables'),
          ],
          questions: [
            q('SELECT * FROM users returns:', 'EASY', '* means all columns from the users table', 'All columns and rows from users', 'Only the first row', 'Only usernames', 'User count'),
            q('Which SQL keyword filters rows?', 'EASY', 'WHERE specifies conditions for filtering', 'WHERE', 'GROUP', 'ORDER', 'HAVING'),
            q('An INNER JOIN returns:', 'MEDIUM', 'Only rows with matching values in both tables', 'Rows with matches in both tables', 'All rows from both tables', 'Only left table rows', 'Cartesian product'),
            q('GROUP BY is used with:', 'MEDIUM', 'GROUP BY groups rows for aggregate functions like COUNT, SUM, AVG', 'Aggregate functions', 'WHERE clauses', 'JOIN operations', 'ORDER BY'),
            q('The difference between WHERE and HAVING is:', 'HARD', 'WHERE filters rows before grouping; HAVING filters after grouping', 'WHERE filters before GROUP BY, HAVING after', 'They are identical', 'WHERE works on aggregates', 'HAVING works on individual rows'),
          ],
        },
        { name: 'Database Design', description: 'Normalization and schema design', isFree: true, entryPrice: null,
          contents: [
            c('Normalization', 'ARTICLE', 'Normalization eliminates data redundancy. First normal form (1NF) eliminates repeating groups, 2NF removes partial dependencies, 3NF removes transitive dependencies.', 'Organizing tables to reduce redundancy'),
            c('Entity-Relationship Modeling', 'ARTICLE', 'ER diagrams model entities (tables), attributes (columns), and relationships (one-to-one, one-to-many, many-to-many). They are a planning tool before writing SQL schema.', 'Visual design of database structure'),
          ],
          questions: [
            q('A primary key must be:', 'EASY', 'Primary keys uniquely identify each row and cannot be null', 'Unique and not null', 'Always an integer', 'Auto-incrementing', 'A foreign key too'),
            q('A foreign key references:', 'EASY', 'Foreign keys link to primary keys in another table', 'A primary key in another table', 'Any column', 'The same table only', 'An index'),
            q('1NF requires:', 'MEDIUM', 'First normal form: atomic values, no repeating groups', 'Atomic (indivisible) values in each cell', 'No foreign keys', 'At least 3 tables', 'Indexed columns'),
            q('A many-to-many relationship requires:', 'MEDIUM', 'A junction (bridge) table holds the pairs of foreign keys', 'A junction table', 'A single foreign key', 'Denormalization', 'Composite primary keys only'),
            q('Denormalization is sometimes used to:', 'HARD', 'Controlled redundancy can improve read performance at the cost of data integrity', 'Improve read performance', 'Reduce storage', 'Enforce constraints', 'Simplify writes'),
          ],
        },
        { name: 'Indexing', description: 'Speeding up database queries', isFree: false, entryPrice: 100,
          contents: [
            c('How Indexes Work', 'ARTICLE', 'An index is a data structure (usually B-tree) that speeds up data retrieval. It trades write performance and storage for much faster reads. Without indexes, queries scan entire tables.', 'Database indexes for query optimization'),
            c('Types of Indexes', 'ARTICLE', 'B-tree indexes handle equality and range queries. Hash indexes are fastest for equality only. Composite indexes cover multiple columns. Partial indexes cover a subset of rows.', 'Choosing the right index type'),
          ],
          questions: [
            q('An index speeds up:', 'EASY', 'Indexes make data retrieval (SELECT) much faster', 'Read queries', 'All operations equally', 'Write operations', 'Delete operations'),
            q('The most common index structure is:', 'EASY', 'B-tree indexes are the default in most databases', 'B-tree', 'Hash table', 'Linked list', 'Array'),
            q('Adding an index slows down:', 'MEDIUM', 'Indexes must be updated on every write, adding overhead', 'INSERT, UPDATE, DELETE operations', 'SELECT operations', 'Nothing', 'Only DELETE'),
            q('A composite index on (a, b) helps queries filtering by:', 'MEDIUM', 'Leftmost prefix: queries on a, or a and b, but not b alone', 'Column a alone, or a and b together', 'Column b alone', 'Either a or b independently', 'Neither a nor b'),
            q('EXPLAIN ANALYZE in SQL shows:', 'HARD', 'It shows the query execution plan and actual runtime statistics', 'Query execution plan and timing', 'Table structure', 'Index definitions', 'User permissions'),
          ],
        },
        { name: 'Transactions', description: 'ACID properties and concurrency control', isFree: false, entryPrice: 120,
          contents: [
            c('ACID Properties', 'ARTICLE', 'Transactions guarantee: Atomicity (all or nothing), Consistency (valid state), Isolation (concurrent transactions don\'t interfere), Durability (committed data survives crashes).', 'The four guarantees of database transactions'),
            c('Isolation Levels', 'ARTICLE', 'SQL defines four isolation levels: READ UNCOMMITTED, READ COMMITTED, REPEATABLE READ, SERIALIZABLE. Higher isolation prevents more anomalies but reduces concurrency.', 'Balancing correctness and performance'),
          ],
          questions: [
            q('The A in ACID stands for:', 'EASY', 'Atomicity: transactions are all-or-nothing', 'Atomicity', 'Availability', 'Authentication', 'Aggregation'),
            q('If a transaction fails midway, atomicity ensures:', 'EASY', 'All changes are rolled back as if the transaction never happened', 'All changes are rolled back', 'Partial changes are saved', 'The database crashes', 'Locks are released'),
            q('A dirty read occurs when:', 'MEDIUM', 'Reading uncommitted data from another transaction', 'A transaction reads uncommitted data from another', 'Two transactions write the same row', 'A query returns no results', 'An index is corrupted'),
            q('The highest isolation level is:', 'MEDIUM', 'SERIALIZABLE prevents all concurrency anomalies', 'SERIALIZABLE', 'READ COMMITTED', 'REPEATABLE READ', 'READ UNCOMMITTED'),
            q('Deadlock occurs when:', 'HARD', 'Two transactions each hold a lock the other needs, creating a cycle', 'Two transactions wait for each other\'s locks', 'A transaction runs too long', 'The database is full', 'Indexes are missing'),
          ],
        },
        { name: 'NoSQL', description: 'Non-relational databases', isFree: true, entryPrice: null,
          contents: [
            c('Types of NoSQL Databases', 'ARTICLE', 'NoSQL databases include document stores (MongoDB), key-value stores (Redis), column-family stores (Cassandra), and graph databases (Neo4j). Each optimizes for different access patterns.', 'The four categories of NoSQL'),
            c('CAP Theorem', 'ARTICLE', 'The CAP theorem states a distributed system can guarantee at most two of: Consistency, Availability, Partition tolerance. Since network partitions are unavoidable, the real choice is between C and A.', 'Trade-offs in distributed databases'),
          ],
          questions: [
            q('MongoDB is a ___ database:', 'EASY', 'MongoDB stores data as JSON-like documents', 'Document', 'Relational', 'Graph', 'Key-value'),
            q('Redis is primarily used as:', 'EASY', 'Redis is an in-memory key-value store used for caching', 'An in-memory cache/key-value store', 'A document database', 'A graph database', 'A relational database'),
            q('CAP theorem says you can have at most ___ of 3 guarantees:', 'MEDIUM', 'Consistency, Availability, Partition tolerance: pick 2', '2', '1', '3', 'All 3 with trade-offs'),
            q('Graph databases excel at:', 'MEDIUM', 'Graph DBs optimize for traversing relationships between entities', 'Querying relationships between entities', 'Storing large files', 'Time-series data', 'Full-text search'),
            q('Eventual consistency means:', 'HARD', 'All replicas will converge to the same value, but not immediately', 'All replicas converge given enough time without new writes', 'Data is always consistent', 'Writes are immediate', 'Reads never return stale data'),
          ],
        },
      ],
    },
    {
      name: 'Operating Systems',
      description: 'Managing hardware and software resources',
      houses: [
        { name: 'Process Management', description: 'Creating, scheduling, and terminating processes', isFree: true, entryPrice: null,
          contents: [
            c('Processes and Threads', 'ARTICLE', 'A process is a running program with its own memory space. Threads are lightweight units within a process that share memory. Multi-threading enables concurrency within a single process.', 'Fundamental units of execution'),
            c('Process States', 'ARTICLE', 'A process transitions between states: new, ready, running, waiting, and terminated. The OS scheduler decides which ready process runs next on the CPU.', 'The lifecycle of a process'),
          ],
          questions: [
            q('A process differs from a thread in that:', 'EASY', 'Processes have separate memory; threads share memory', 'Processes have separate memory spaces', 'Threads have separate memory', 'They are identical', 'Processes are faster'),
            q('The program counter tracks:', 'EASY', 'It holds the address of the next instruction to execute', 'The next instruction to execute', 'Memory allocation', 'Disk usage', 'Network connections'),
            q('Context switching involves:', 'MEDIUM', 'Saving the current process state and loading another', 'Saving and restoring process state', 'Rebooting the system', 'Allocating new memory', 'Closing all files'),
            q('A zombie process is:', 'MEDIUM', 'A terminated process whose parent hasn\'t read its exit status', 'A terminated process waiting for parent to read exit status', 'A process using too much CPU', 'An orphan process', 'A deadlocked process'),
            q('The fork() system call:', 'HARD', 'fork() creates a copy of the current process (child)', 'Creates a new child process', 'Terminates the process', 'Opens a file', 'Switches context'),
          ],
        },
        { name: 'Memory Management', description: 'Virtual memory, paging, and allocation', isFree: true, entryPrice: null,
          contents: [
            c('Virtual Memory', 'ARTICLE', 'Virtual memory gives each process the illusion of having a large, contiguous address space. The OS and hardware translate virtual addresses to physical addresses using page tables.', 'Abstracting physical memory for processes'),
            c('Paging', 'ARTICLE', 'Memory is divided into fixed-size pages (virtual) and frames (physical). When a page is not in physical memory, a page fault triggers the OS to load it from disk.', 'How virtual memory is implemented'),
          ],
          questions: [
            q('Virtual memory allows processes to:', 'EASY', 'Each process sees its own large address space', 'Use more memory than physically available', 'Run faster', 'Access disk directly', 'Share all memory'),
            q('A page fault occurs when:', 'EASY', 'The requested page is not in physical memory (RAM)', 'A page is not in physical memory', 'Memory is corrupted', 'A program crashes', 'The disk is full'),
            q('The page table maps:', 'MEDIUM', 'It translates virtual page numbers to physical frame numbers', 'Virtual pages to physical frames', 'Files to disk sectors', 'Processes to CPUs', 'Ports to services'),
            q('Thrashing occurs when:', 'MEDIUM', 'The system spends more time swapping pages than executing', 'Too many page faults cause constant swapping', 'CPU overheats', 'Memory leaks', 'Processes deadlock'),
            q('The LRU page replacement algorithm evicts:', 'HARD', 'Least Recently Used: remove the page that hasn\'t been accessed for the longest time', 'The least recently used page', 'The most recently used page', 'The largest page', 'A random page'),
          ],
        },
        { name: 'File Systems', description: 'Organizing and accessing files on disk', isFree: false, entryPrice: 80,
          contents: [
            c('File System Structure', 'ARTICLE', 'File systems organize data on storage devices. They manage files, directories, metadata (permissions, timestamps), and free space. Common file systems include ext4, NTFS, and APFS.', 'How data is organized on disk'),
            c('Inodes and Directories', 'ARTICLE', 'In Unix-like systems, an inode stores file metadata and block pointers. A directory is a file that maps names to inode numbers. Hard links share inodes; symbolic links store a path.', 'Internal file system data structures'),
          ],
          questions: [
            q('A file system manages:', 'EASY', 'File systems organize files, directories, and metadata on disk', 'Files and directories on storage', 'CPU scheduling', 'Network connections', 'Memory allocation'),
            q('An inode stores:', 'EASY', 'Inodes contain file metadata (size, permissions, block pointers) but NOT the filename', 'File metadata and block pointers', 'File contents', 'Directory names', 'User passwords'),
            q('A hard link:', 'MEDIUM', 'Hard links are additional directory entries pointing to the same inode', 'Points to the same inode as the original', 'Copies the file', 'Points to a file path', 'Is a shortcut on the desktop'),
            q('Journaling file systems:', 'MEDIUM', 'They log changes before applying them, enabling recovery after crashes', 'Log changes to recover from crashes', 'Compress all data', 'Encrypt all files', 'Use more disk space for speed'),
            q('The maximum file size in ext4 is approximately:', 'HARD', 'ext4 supports files up to 16 TiB', '16 TiB', '4 GiB', '2 TiB', '256 GiB'),
          ],
        },
        { name: 'Scheduling', description: 'CPU scheduling algorithms', isFree: false, entryPrice: 100,
          contents: [
            c('Scheduling Algorithms', 'ARTICLE', 'FCFS (first-come-first-served) is simple but can cause convoy effect. SJF (shortest-job-first) minimizes average wait time but requires knowing burst times. Round-robin uses time slices for fairness.', 'How the OS decides which process runs next'),
            c('Priority Scheduling', 'ARTICLE', 'Priority scheduling runs higher-priority processes first. Starvation can occur when low-priority processes never run. Aging (gradually increasing priority) solves this.', 'Scheduling with process priorities'),
          ],
          questions: [
            q('FCFS scheduling processes tasks in:', 'EASY', 'First Come, First Served: tasks run in arrival order', 'Arrival order', 'Priority order', 'Random order', 'Size order'),
            q('Round-robin scheduling gives each process a:', 'EASY', 'Each process gets a fixed time slice (quantum) before being preempted', 'Time quantum (time slice)', 'Priority level', 'Memory page', 'CPU core'),
            q('SJF stands for:', 'MEDIUM', 'Shortest Job First: runs the process with smallest burst time next', 'Shortest Job First', 'Sequential Job Flow', 'System Job Finder', 'Shared Job Framework'),
            q('Starvation in priority scheduling is solved by:', 'MEDIUM', 'Aging gradually increases the priority of waiting processes', 'Aging (increasing priority over time)', 'Killing low-priority processes', 'Adding more CPUs', 'Using FCFS instead'),
            q('Preemptive scheduling means:', 'HARD', 'The OS can interrupt a running process to give CPU to another', 'A running process can be interrupted by the scheduler', 'Processes run to completion', 'No context switching occurs', 'Only one process runs at a time'),
          ],
        },
        { name: 'Concurrency', description: 'Synchronization, mutexes, and deadlocks', isFree: false, entryPrice: 150,
          contents: [
            c('Race Conditions', 'ARTICLE', 'A race condition occurs when multiple threads access shared data concurrently and at least one writes. The outcome depends on timing. Synchronization primitives prevent this.', 'When concurrent access causes bugs'),
            c('Synchronization Primitives', 'ARTICLE', 'Mutexes provide mutual exclusion (one thread at a time). Semaphores generalize to N threads. Condition variables allow threads to wait for specific conditions. These are the building blocks of concurrent programming.', 'Tools for safe concurrent programming'),
          ],
          questions: [
            q('A race condition involves:', 'EASY', 'Multiple threads accessing shared data with at least one writing', 'Unsynchronized access to shared data', 'Too many processes', 'Slow I/O', 'Memory leaks'),
            q('A mutex provides:', 'EASY', 'Mutual exclusion: only one thread can hold the lock', 'Mutual exclusion', 'Memory allocation', 'CPU scheduling', 'File access'),
            q('Deadlock requires all four conditions:', 'MEDIUM', 'Mutual exclusion, hold and wait, no preemption, circular wait', 'Mutual exclusion, hold-and-wait, no preemption, circular wait', 'Starvation, livelock, race, deadlock', 'Lock, unlock, wait, signal', 'Read, write, execute, delete'),
            q('A semaphore initialized to 5 allows:', 'MEDIUM', 'Up to 5 threads can enter the critical section simultaneously', 'Up to 5 concurrent accesses', 'Only 1 access', 'Unlimited access', '5 total accesses ever'),
            q('The dining philosophers problem illustrates:', 'HARD', 'It demonstrates deadlock when processes compete for multiple resources', 'Deadlock from competing for shared resources', 'Starvation from priority', 'Race conditions in I/O', 'Memory fragmentation'),
          ],
        },
      ],
    },
  ],
};
// ─── PHILOSOPHY ──────────────────────────────────────────────

const philosophy: SeedKingdom = {
  name: 'Philosophy',
  description: 'The kingdom of wisdom, reason, and the pursuit of fundamental truths',
  villages: [
    {
      name: 'Ethics',
      description: 'Moral principles and theories of right and wrong',
      houses: [
        { name: 'Virtue Ethics', description: 'Character-based morality from Aristotle', isFree: true, entryPrice: null,
          contents: [
            c('Aristotle\'s Virtue Ethics', 'ARTICLE', 'Virtue ethics focuses on developing good character traits (virtues) rather than following rules. Aristotle argued that virtues are habits cultivated through practice, and the goal is eudaimonia (flourishing).', 'Character as the foundation of morality'),
            c('The Golden Mean', 'ARTICLE', 'Aristotle\'s doctrine of the mean states that virtue lies between two extremes: deficiency and excess. Courage, for example, is the mean between cowardice and recklessness.', 'Finding balance in moral character'),
          ],
          questions: [
            q('Virtue ethics emphasizes:', 'EASY', 'Virtue ethics focuses on moral character rather than rules or consequences', 'Developing good character', 'Following rules', 'Maximizing happiness', 'Social contracts'),
            q('Eudaimonia is best translated as:', 'EASY', 'Aristotle\'s concept of the good life: flourishing or well-being', 'Flourishing or well-being', 'Pleasure', 'Wealth', 'Power'),
            q('According to Aristotle, virtue is:', 'MEDIUM', 'Virtues are developed through repeated practice and habit', 'A habit developed through practice', 'An innate quality', 'A set of rules', 'A feeling'),
            q('The doctrine of the mean says courage is between:', 'MEDIUM', 'Cowardice (deficiency) and recklessness (excess)', 'Cowardice and recklessness', 'Fear and anger', 'Honesty and dishonesty', 'Wisdom and ignorance'),
            q('A key criticism of virtue ethics is:', 'HARD', 'It provides less clear guidance for specific moral dilemmas than rule-based theories', 'It offers vague action guidance', 'It ignores character', 'It is too strict', 'It only applies to ancient Greece'),
          ],
        },
        { name: 'Utilitarianism', description: 'The greatest good for the greatest number', isFree: true, entryPrice: null,
          contents: [
            c('Bentham and Mill', 'ARTICLE', 'Jeremy Bentham founded utilitarianism: an action is right if it maximizes total happiness. John Stuart Mill refined it, distinguishing higher (intellectual) from lower (bodily) pleasures.', 'The founders of utilitarian thought'),
            c('Act vs Rule Utilitarianism', 'ARTICLE', 'Act utilitarianism evaluates each action individually by its consequences. Rule utilitarianism follows rules that generally maximize happiness, even if a specific exception might produce more.', 'Two forms of utilitarian reasoning'),
          ],
          questions: [
            q('Utilitarianism judges actions by their:', 'EASY', 'Utility = consequences in terms of happiness/well-being', 'Consequences', 'Intentions', 'Rules', 'Character'),
            q('The greatest happiness principle was formulated by:', 'EASY', 'Bentham\'s principle of utility: the greatest good for the greatest number', 'Jeremy Bentham', 'Immanuel Kant', 'Aristotle', 'John Rawls'),
            q('Mill argued that some pleasures are:', 'MEDIUM', 'Mill distinguished higher (intellectual) from lower (bodily) pleasures', 'Higher in quality than others', 'All equal', 'Immoral', 'Irrelevant to ethics'),
            q('A trolley problem tests utilitarianism by:', 'MEDIUM', 'It forces choosing between outcomes with different numbers of casualties', 'Forcing a choice between saving more or fewer lives', 'Asking about virtues', 'Testing logical consistency', 'Examining duty'),
            q('A key objection to utilitarianism is:', 'HARD', 'It could justify harming an innocent person if it maximizes overall happiness', 'It can justify injustice to minorities', 'It ignores consequences', 'It is too focused on rules', 'It requires perfect character'),
          ],
        },
        { name: 'Deontology', description: 'Duty-based ethics and Kant\'s moral philosophy', isFree: false, entryPrice: 100,
          contents: [
            c('Kant\'s Categorical Imperative', 'ARTICLE', 'Kant argued that moral rules are universal and unconditional. The categorical imperative states: act only according to rules you could will to be universal laws. This makes lying always wrong regardless of consequences.', 'Kant\'s supreme principle of morality'),
            c('Duty vs Inclination', 'ARTICLE', 'For Kant, an action has moral worth only when done from duty, not from desire or self-interest. A shopkeeper who is honest only because it\'s good for business acts rightly but not morally.', 'Why motivation matters in Kantian ethics'),
          ],
          questions: [
            q('Deontology focuses on:', 'EASY', 'Deontological ethics judges rightness by adherence to duties or rules', 'Duties and rules', 'Consequences', 'Character', 'Feelings'),
            q('The categorical imperative is:', 'EASY', 'Kant\'s moral law that applies universally without exception', 'An unconditional moral command', 'A suggestion', 'A utilitarian principle', 'A virtue'),
            q('For Kant, lying is wrong because:', 'MEDIUM', 'You cannot universalize a maxim of lying without contradiction', 'It cannot be universalized consistently', 'It makes people unhappy', 'It shows bad character', 'Society says so'),
            q('Kant treats people as "ends in themselves" meaning:', 'MEDIUM', 'Never use people merely as means to your own goals', 'People have inherent dignity and worth', 'People are goals to achieve', 'People are means to happiness', 'People define their own morality'),
            q('A criticism of deontology is:', 'HARD', 'Rigid rules can lead to absurd outcomes (e.g., must not lie to a murderer)', 'It can produce counterintuitive results in extreme cases', 'It ignores all rules', 'It is too focused on happiness', 'It requires perfect character'),
          ],
        },
        { name: 'Applied Ethics', description: 'Ethics in real-world contexts', isFree: true, entryPrice: null,
          contents: [
            c('Bioethics', 'ARTICLE', 'Bioethics applies ethical principles to medicine and biology: euthanasia, genetic engineering, abortion, and organ donation. Key principles include autonomy, beneficence, non-maleficence, and justice.', 'Ethical issues in medicine and biology'),
            c('Environmental Ethics', 'ARTICLE', 'Environmental ethics considers moral obligations to nature. Anthropocentrism values nature only for human benefit. Biocentrism extends moral consideration to all living things. Ecocentrism values entire ecosystems.', 'Our moral relationship with the environment'),
          ],
          questions: [
            q('Bioethics deals with ethical issues in:', 'EASY', 'Bioethics covers medicine, biology, and life sciences', 'Medicine and biology', 'Business', 'Technology only', 'Law only'),
            q('The principle of autonomy in bioethics means:', 'EASY', 'Patients have the right to make informed decisions about their care', 'Respecting individual decision-making', 'Doctors know best', 'Maximizing health outcomes', 'Following laws'),
            q('Anthropocentrism values nature:', 'MEDIUM', 'Anthropocentrism = human-centered: nature matters only for human benefit', 'Only for its benefit to humans', 'For its own sake', 'Not at all', 'More than humans'),
            q('The trolley problem is an example of:', 'MEDIUM', 'It presents a moral dilemma testing our ethical intuitions', 'A thought experiment in applied ethics', 'A logic puzzle', 'A scientific experiment', 'A legal case'),
            q('Peter Singer\'s argument for animal rights is based on:', 'HARD', 'Singer argues the capacity to suffer, not species, determines moral consideration', 'The principle of equal consideration of interests', 'Religious teachings', 'Legal precedent', 'Kantian duty'),
          ],
        },
        { name: 'Meta-Ethics', description: 'The nature and foundations of morality itself', isFree: false, entryPrice: 150,
          contents: [
            c('Moral Realism vs Anti-Realism', 'ARTICLE', 'Moral realism holds that objective moral facts exist independently of beliefs. Anti-realism denies this, arguing moral statements are expressions of attitudes (emotivism) or cultural conventions (relativism).', 'Do objective moral truths exist?'),
            c('Moral Relativism', 'ARTICLE', 'Cultural relativism claims that morality varies by culture and no universal standard exists. Critics argue this makes it impossible to criticize practices like slavery across cultures.', 'Is morality relative to culture?'),
          ],
          questions: [
            q('Meta-ethics asks:', 'EASY', 'Meta-ethics examines the nature and status of moral claims', 'What is the nature of morality?', 'What should I do?', 'Who is virtuous?', 'What are the laws?'),
            q('Moral realism claims:', 'EASY', 'Moral facts exist independently of what anyone thinks', 'Objective moral facts exist', 'Morality is relative', 'Morals are just emotions', 'There are no moral truths'),
            q('Emotivism says moral statements are:', 'MEDIUM', 'A.J. Ayer: "Stealing is wrong" expresses disapproval, not a fact', 'Expressions of attitudes or feelings', 'Objective truths', 'Commands from God', 'Scientific hypotheses'),
            q('Cultural relativism implies:', 'MEDIUM', 'No culture\'s morality is superior to another\'s', 'No universal moral standards exist', 'All cultures agree on morality', 'Morality is objective', 'Some cultures are morally superior'),
            q('The is-ought problem (Hume) states that:', 'HARD', 'You cannot derive moral "ought" statements purely from factual "is" statements', 'Facts alone cannot determine values', 'Values determine facts', 'Science answers moral questions', 'Morality is logical'),
          ],
        },
      ],
    },
    {
      name: 'Logic',
      description: 'The study of valid reasoning and argumentation',
      houses: [
        { name: 'Propositional Logic', description: 'Logic of statements with AND, OR, NOT, IF-THEN', isFree: true, entryPrice: null,
          contents: [
            c('Logical Connectives', 'ARTICLE', 'Propositional logic uses connectives: AND (∧), OR (∨), NOT (¬), IF-THEN (→), IF AND ONLY IF (↔). Truth tables show the truth value of compound statements for all input combinations.', 'The building blocks of logical reasoning'),
            c('Validity and Soundness', 'ARTICLE', 'An argument is valid if the conclusion follows necessarily from the premises. It is sound if it is valid AND all premises are true. Valid arguments can have false conclusions if premises are false.', 'Evaluating logical arguments'),
          ],
          questions: [
            q('In logic, P ∧ Q means:', 'EASY', '∧ is the AND operator: both must be true', 'P AND Q', 'P OR Q', 'NOT P', 'IF P THEN Q'),
            q('A tautology is a statement that is:', 'EASY', 'A tautology is true under every possible interpretation', 'Always true', 'Always false', 'Sometimes true', 'Unprovable'),
            q('P → Q is false only when:', 'MEDIUM', 'A conditional is false only when the antecedent is true and consequent false', 'P is true and Q is false', 'P is false and Q is true', 'Both are false', 'Both are true'),
            q('The contrapositive of P → Q is:', 'MEDIUM', 'Contrapositive ¬Q → ¬P is logically equivalent to P → Q', '¬Q → ¬P', 'Q → P', '¬P → ¬Q', 'P ∧ Q'),
            q('Modus ponens states: if P → Q and P, then:', 'HARD', 'If the conditional and antecedent are true, the consequent must be true', 'Q', '¬Q', 'P', '¬P'),
          ],
        },
        { name: 'Predicate Logic', description: 'Quantifiers, variables, and formal statements', isFree: true, entryPrice: null,
          contents: [
            c('Quantifiers', 'ARTICLE', 'Predicate logic extends propositional logic with quantifiers: ∀ (for all) and ∃ (there exists). "All humans are mortal" becomes ∀x(Human(x) → Mortal(x)).', 'Universal and existential quantifiers'),
            c('Predicates and Relations', 'ARTICLE', 'A predicate assigns a property to objects: Red(x) means x is red. Relations connect objects: Loves(x,y) means x loves y. Predicate logic enables precise formal reasoning.', 'Expressing properties and relationships formally'),
          ],
          questions: [
            q('∀x means:', 'EASY', 'The universal quantifier: the statement holds for all x', 'For all x', 'There exists an x', 'For no x', 'For some x'),
            q('∃x means:', 'EASY', 'The existential quantifier: at least one x exists satisfying the statement', 'There exists an x', 'For all x', 'For no x', 'For exactly one x'),
            q('The negation of ∀x P(x) is:', 'MEDIUM', 'Not everything is P = something is not P', '∃x ¬P(x)', '∀x ¬P(x)', '¬∃x P(x)', '∃x P(x)'),
            q('"Some birds can fly" is formalized as:', 'MEDIUM', 'There exists a bird that can fly', '∃x(Bird(x) ∧ CanFly(x))', '∀x(Bird(x) → CanFly(x))', '∃x(Bird(x) → CanFly(x))', '¬∃x(Bird(x) ∧ CanFly(x))'),
            q('∀x∃y Loves(x,y) means:', 'HARD', 'For every person, there is someone they love (each may love a different person)', 'Everyone loves someone', 'Someone loves everyone', 'Everyone loves everyone', 'Nobody loves anyone'),
          ],
        },
        { name: 'Fallacies', description: 'Common errors in reasoning', isFree: false, entryPrice: 80,
          contents: [
            c('Informal Fallacies', 'ARTICLE', 'Informal fallacies are errors in reasoning that aren\'t due to invalid logical form. They include ad hominem (attacking the person), straw man (misrepresenting an argument), and appeal to authority.', 'Common reasoning mistakes to avoid'),
            c('Formal Fallacies', 'ARTICLE', 'Formal fallacies have invalid logical structure regardless of content. Affirming the consequent (if P then Q; Q; therefore P) and denying the antecedent (if P then Q; not P; therefore not Q) are classic examples.', 'Structurally invalid argument patterns'),
          ],
          questions: [
            q('Ad hominem attacks:', 'EASY', 'It attacks the person instead of addressing their argument', 'The person, not the argument', 'The argument\'s logic', 'The evidence', 'The conclusion'),
            q('A straw man fallacy:', 'EASY', 'Misrepresenting someone\'s argument to make it easier to attack', 'Misrepresents the opponent\'s position', 'Uses statistics incorrectly', 'Appeals to emotions', 'Ignores the conclusion'),
            q('Appeal to authority is fallacious when:', 'MEDIUM', 'Citing an authority outside their area of expertise', 'The authority is not an expert in the relevant field', 'Any authority is cited', 'The authority disagrees', 'Evidence supports the claim'),
            q('Affirming the consequent: "If it rains, the ground is wet. The ground is wet. Therefore:"', 'MEDIUM', 'This fallaciously concludes it rained; the ground could be wet for other reasons', '"It rained" — this is a fallacy', '"It didn\'t rain"', '"The ground is dry"', '"It will rain"'),
            q('The slippery slope fallacy assumes:', 'HARD', 'It claims one small step inevitably leads to extreme consequences without evidence', 'One action will inevitably lead to extreme consequences', 'All slopes are dangerous', 'Arguments have no middle ground', 'Evidence is unnecessary'),
          ],
        },
        { name: 'Argumentation', description: 'Constructing and evaluating arguments', isFree: true, entryPrice: null,
          contents: [
            c('Deductive vs Inductive', 'ARTICLE', 'Deductive arguments guarantee the conclusion if premises are true (top-down). Inductive arguments provide probable but not certain conclusions based on evidence (bottom-up).', 'Two fundamental types of reasoning'),
            c('Argument Structure', 'ARTICLE', 'An argument has premises (supporting statements) and a conclusion. Evaluating arguments involves checking premise truth, logical validity, and whether premises are sufficient for the conclusion.', 'How arguments are built and evaluated'),
          ],
          questions: [
            q('A deductive argument with true premises guarantees:', 'EASY', 'Valid deduction with true premises = true conclusion', 'A true conclusion', 'A probable conclusion', 'A false conclusion', 'Nothing'),
            q('Inductive reasoning moves from:', 'EASY', 'Induction generalizes from specific observations', 'Specific to general', 'General to specific', 'Theory to practice', 'Conclusion to premise'),
            q('A valid argument can have a false conclusion if:', 'MEDIUM', 'Validity preserves truth; false premises can lead to false conclusions', 'One or more premises are false', 'The logic is incorrect', 'The conclusion is too long', 'There are too many premises'),
            q('An argument is sound if it is:', 'MEDIUM', 'Sound = valid + all premises are actually true', 'Valid with all true premises', 'Just valid', 'Just has true premises', 'Convincing'),
            q('Abductive reasoning is also known as:', 'HARD', 'Abduction = inference to the best explanation', 'Inference to the best explanation', 'Deduction', 'Mathematical proof', 'Emotional reasoning'),
          ],
        },
        { name: 'Modal Logic', description: 'Necessity, possibility, and possible worlds', isFree: false, entryPrice: 200,
          contents: [
            c('Necessity and Possibility', 'ARTICLE', 'Modal logic adds operators: □ (necessarily) and ◇ (possibly). □P means P is true in all possible worlds. ◇P means P is true in at least one possible world.', 'Logic beyond simple true/false'),
            c('Possible Worlds', 'ARTICLE', 'Possible worlds semantics evaluates modal claims by considering all ways the world could be. "It\'s possible that it rains" is true if there\'s a possible world where it rains.', 'A framework for modal reasoning'),
          ],
          questions: [
            q('□P means P is:', 'EASY', '□ = necessarily: P is true in all possible worlds', 'Necessarily true', 'Possibly true', 'Actually true', 'Never true'),
            q('◇P means P is:', 'EASY', '◇ = possibly: P is true in at least one possible world', 'Possibly true', 'Necessarily true', 'Always false', 'Unknowable'),
            q('If □P, then ◇P:', 'MEDIUM', 'If P is true in all worlds, it\'s true in at least one', 'Is always true', 'Is always false', 'Depends on P', 'Is undefined'),
            q('A contingent truth is:', 'MEDIUM', 'True in the actual world but not necessarily true', 'True but not necessarily so', 'Necessarily true', 'Necessarily false', 'Neither true nor false'),
            q('In Kripke semantics, possible worlds are related by:', 'HARD', 'An accessibility relation determines which worlds are relevant to modal claims', 'An accessibility relation', 'Physical distance', 'Time', 'Causation'),
          ],
        },
      ],
    },
    {
      name: 'Metaphysics',
      description: 'The fundamental nature of reality',
      houses: [
        { name: 'Ontology', description: 'What exists and categories of being', isFree: true, entryPrice: null,
          contents: [
            c('Questions of Existence', 'ARTICLE', 'Ontology asks: what exists? Do numbers exist? Do universals (redness, justice) exist? Realists say abstract entities exist independently. Nominalists say only particular objects exist.', 'The philosophical study of what there is'),
            c('Substance and Properties', 'ARTICLE', 'Substance theories ask what makes an object what it is. Is an object a bundle of properties, or is there a substrate underlying properties? This debate has persisted since Aristotle.', 'What are objects made of, philosophically?'),
          ],
          questions: [
            q('Ontology is the study of:', 'EASY', 'Ontology = the study of being, existence, and what there is', 'What exists', 'What is true', 'What is right', 'What is beautiful'),
            q('A realist about numbers believes:', 'EASY', 'Mathematical realism: numbers exist independently of human minds', 'Numbers exist independently of minds', 'Numbers are inventions', 'Numbers don\'t exist', 'Numbers are just words'),
            q('Nominalism holds that:', 'MEDIUM', 'Only particular things exist; universals are just names', 'Only particular objects exist', 'Universals exist independently', 'Everything is mental', 'Nothing exists'),
            q('The problem of universals asks:', 'MEDIUM', 'Do properties like "redness" exist separately from red things?', 'Whether general properties exist independently', 'How many things exist', 'Whether God exists', 'What time is'),
            q('Quine\'s criterion of ontological commitment states:', 'HARD', 'We are committed to the existence of whatever our best theories quantify over', 'We are committed to what our best theories quantify over', 'Everything that can be named exists', 'Only physical objects exist', 'Nothing truly exists'),
          ],
        },
        { name: 'Free Will', description: 'Determinism, freedom, and moral responsibility', isFree: true, entryPrice: null,
          contents: [
            c('The Free Will Debate', 'ARTICLE', 'Determinism says every event is caused by prior events. If true, are our choices free? Libertarians (philosophical) say yes, we have genuine free will. Hard determinists say no. Compatibilists say free will is compatible with determinism.', 'Are we truly free to choose?'),
            c('Compatibilism', 'ARTICLE', 'Compatibilists define free will as acting according to one\'s desires without external coercion, even if those desires are determined. This view preserves moral responsibility within a deterministic framework.', 'Freedom and determinism can coexist'),
          ],
          questions: [
            q('Determinism is the view that:', 'EASY', 'Every event is the inevitable result of prior causes', 'Every event is caused by prior events', 'We have free will', 'Nothing is predictable', 'God controls everything'),
            q('Compatibilism holds that:', 'EASY', 'Free will and determinism can both be true', 'Free will is compatible with determinism', 'Free will is an illusion', 'Determinism is false', 'We have no choices'),
            q('Hard determinism implies:', 'MEDIUM', 'If all events are determined, genuine free will does not exist', 'Free will is an illusion', 'We are always free', 'Morality is objective', 'Science is wrong'),
            q('Libertarianism (metaphysical) claims:', 'MEDIUM', 'We have genuine free will that is not determined by prior causes', 'Humans have genuine undetermined free will', 'Everything is determined', 'Free will is compatible with determinism', 'Only God has free will'),
            q('The consequence argument against compatibilism states:', 'HARD', 'If our actions are consequences of laws and past, we have no real choice', 'No one has power over the laws of nature or the distant past', 'Compatibilism is self-contradictory', 'Free will requires randomness', 'Moral responsibility requires God'),
          ],
        },
        { name: 'Personal Identity', description: 'What makes you the same person over time', isFree: false, entryPrice: 100,
          contents: [
            c('Persistence Through Time', 'ARTICLE', 'Personal identity asks: what makes you at age 5 the same person as you at age 50? The body changes completely, memories fade. Theories include psychological continuity, bodily continuity, and narrative identity.', 'What makes you, you?'),
            c('Thought Experiments', 'ARTICLE', 'Teleporter problems, brain transplants, and split-brain scenarios challenge our intuitions about identity. If your brain were copied perfectly into a new body, would the copy be you?', 'Testing our concept of identity'),
          ],
          questions: [
            q('The problem of personal identity asks:', 'EASY', 'What makes someone the same person across time?', 'What makes you the same person over time?', 'What is your name?', 'Where do you live?', 'How old are you?'),
            q('Locke argued personal identity depends on:', 'EASY', 'John Locke: memory and psychological continuity define identity', 'Memory and consciousness', 'The body', 'The soul', 'DNA'),
            q('The Ship of Theseus problem illustrates:', 'MEDIUM', 'If all planks are replaced, is it the same ship? Tests identity through change', 'Identity through gradual change', 'Navigation skills', 'Ship construction', 'Greek mythology'),
            q('Psychological continuity theory says you are the same person if:', 'MEDIUM', 'Connected by overlapping chains of memories, beliefs, desires', 'There is a chain of psychological connections', 'Your body is continuous', 'Your soul persists', 'Others recognize you'),
            q('Derek Parfit argued personal identity:', 'HARD', 'Parfit argued identity is not what matters; what matters is psychological continuity, which comes in degrees', 'Is not what matters; continuity comes in degrees', 'Is determined by the soul', 'Is purely physical', 'Is always determinate'),
          ],
        },
        { name: 'Causation', description: 'The nature of cause and effect', isFree: false, entryPrice: 80,
          contents: [
            c('Hume on Causation', 'ARTICLE', 'Hume argued we never observe causation directly — only constant conjunction (A always followed by B). Our belief in causation is a habit of mind, not a logical necessity.', 'Hume\'s skeptical analysis of cause and effect'),
            c('Counterfactual Theory', 'ARTICLE', 'David Lewis proposed: A caused B if and only if, had A not occurred, B would not have occurred. This counterfactual approach handles many cases but struggles with overdetermination.', 'Causation through "what if" reasoning'),
          ],
          questions: [
            q('Hume argued that causation is based on:', 'EASY', 'We observe constant conjunction, not necessary connection', 'Observed constant conjunction', 'Logical necessity', 'Divine will', 'Mathematical proof'),
            q('A counterfactual statement has the form:', 'EASY', 'Counterfactuals: "If A had not happened, B would not have happened"', '"If X had not occurred, Y would not have occurred"', '"X and Y always occur together"', '"X is the essence of Y"', '"X is logically equivalent to Y"'),
            q('The problem of overdetermination arises when:', 'MEDIUM', 'Two independent causes each sufficient to produce the effect', 'Multiple sufficient causes exist', 'No cause can be identified', 'The effect precedes the cause', 'Causes are mental'),
            q('Necessary and sufficient conditions differ in that:', 'MEDIUM', 'Necessary = must be present; sufficient = guarantees the outcome', 'Necessary must be present; sufficient guarantees the result', 'They are the same thing', 'Necessary is stronger', 'Sufficient must be present'),
            q('Hume\'s problem of induction challenges:', 'HARD', 'We cannot justify assuming the future will resemble the past', 'Our justification for causal generalizations from experience', 'The existence of causation', 'The existence of the external world', 'All of logic'),
          ],
        },
        { name: 'Time and Space', description: 'The nature of temporal and spatial reality', isFree: true, entryPrice: null,
          contents: [
            c('Presentism vs Eternalism', 'ARTICLE', 'Presentism holds that only the present moment exists. Eternalism (the "block universe") says past, present, and future all exist equally. The growing block theory says past and present exist but not the future.', 'Does the past still exist? Does the future already exist?'),
            c('The Nature of Space', 'ARTICLE', 'Substantivalism treats space as a real entity (like a container). Relationalism (Leibniz) says space is just the spatial relations between objects. General relativity seems to favor substantivalism.', 'Is space a thing, or just relations between things?'),
          ],
          questions: [
            q('Presentism holds that:', 'EASY', 'Only the present moment is real', 'Only the present exists', 'Past, present, and future all exist', 'Only the past exists', 'Time is an illusion'),
            q('Eternalism (block universe) holds that:', 'EASY', 'All times are equally real, like frames on a film strip', 'Past, present, and future all equally exist', 'Only the present exists', 'Time flows forward', 'The future is undetermined'),
            q('McTaggart\'s A-series describes time in terms of:', 'MEDIUM', 'A-series: past, present, future (tensed/dynamic)', 'Past, present, and future', 'Earlier and later relations', 'Clock readings', 'Spatial analogies'),
            q('Leibniz\'s relationalism about space claims:', 'MEDIUM', 'Space is not a substance but merely the relations between objects', 'Space is just relations between objects', 'Space is a container', 'Space is infinite', 'Space does not exist'),
            q('The argument from special relativity against presentism is:', 'HARD', 'Simultaneity is relative: what is "now" depends on the observer\'s frame', 'There is no absolute present moment across reference frames', 'Time does not exist', 'Space and time are identical', 'Presentism is logically contradictory'),
          ],
        },
      ],
    },
    {
      name: 'Epistemology',
      description: 'The nature, sources, and limits of knowledge',
      houses: [
        { name: 'Nature of Knowledge', description: 'What is knowledge and justified belief?', isFree: true, entryPrice: null,
          contents: [
            c('Justified True Belief', 'ARTICLE', 'The classical analysis defines knowledge as justified true belief (JTB): S knows P if (1) P is true, (2) S believes P, and (3) S is justified in believing P.', 'The traditional definition of knowledge'),
            c('Gettier Problems', 'ARTICLE', 'Edmund Gettier showed that JTB is not sufficient for knowledge. A person can have a justified true belief by luck. This has led to decades of debate about what the fourth condition of knowledge should be.', 'Why justified true belief isn\'t enough'),
          ],
          questions: [
            q('The traditional definition of knowledge is:', 'EASY', 'Knowledge = Justified True Belief (Plato\'s Theaetetus)', 'Justified true belief', 'True belief', 'Certain belief', 'Rational opinion'),
            q('For something to be knowledge, it must be:', 'EASY', 'All three conditions must hold: belief, truth, justification', 'Believed, true, and justified', 'Believed and true', 'Just believed', 'Just true'),
            q('Gettier problems show that:', 'MEDIUM', 'JTB can be satisfied by luck, so it\'s insufficient for knowledge', 'Justified true belief can be accidental', 'Knowledge is impossible', 'Justification is unnecessary', 'Truth is relative'),
            q('A belief is justified if:', 'MEDIUM', 'There are good reasons or evidence supporting it', 'It is supported by adequate evidence or reasons', 'It is widely held', 'It feels certain', 'An authority endorses it'),
            q('Reliabilism defines justification in terms of:', 'HARD', 'A belief is justified if produced by a reliable cognitive process', 'The reliability of the belief-forming process', 'Coherence with other beliefs', 'Self-evidence', 'Social agreement'),
          ],
        },
        { name: 'Skepticism', description: 'Challenges to the possibility of knowledge', isFree: true, entryPrice: null,
          contents: [
            c('Radical Skepticism', 'ARTICLE', 'Descartes\' evil demon hypothesis: what if a powerful being deceives us about everything? The modern version is the brain-in-a-vat scenario. These challenge whether we can know anything about the external world.', 'Can we know anything for certain?'),
            c('Responses to Skepticism', 'ARTICLE', 'Descartes found certainty in "I think, therefore I am." Moore held up his hands as proof of an external world. Contextualism says knowledge claims depend on conversational standards.', 'How philosophers push back against doubt'),
          ],
          questions: [
            q('Descartes\' method of doubt aims to:', 'EASY', 'He doubted everything to find what is absolutely certain', 'Find certainty by doubting everything', 'Prove God exists', 'Deny all knowledge', 'Create confusion'),
            q('"I think, therefore I am" establishes:', 'EASY', 'Cogito ergo sum: the one thing the doubter cannot doubt is their own existence', 'The certainty of one\'s own existence', 'The existence of God', 'The external world exists', 'Morality is objective'),
            q('The brain-in-a-vat scenario updates:', 'MEDIUM', 'It\'s a modern version of Descartes\' evil demon', 'Descartes\' evil demon hypothesis', 'Plato\'s cave allegory', 'Berkeley\'s idealism', 'Hume\'s problem of induction'),
            q('Moore\'s proof of an external world involved:', 'MEDIUM', 'G.E. Moore held up his hands as proof that external objects exist', 'Holding up his hands as evidence', 'A logical deduction', 'A scientific experiment', 'An appeal to God'),
            q('Contextualism about knowledge claims that:', 'HARD', 'The standards for "knowing" shift depending on context', 'Knowledge attributions vary with conversational context', 'Knowledge is impossible', 'Context is irrelevant to truth', 'Everyone knows the same things'),
          ],
        },
        { name: 'Perception', description: 'How we know the world through experience', isFree: false, entryPrice: 80,
          contents: [
            c('Direct vs Indirect Realism', 'ARTICLE', 'Direct realism says we perceive objects themselves. Indirect realism says we perceive mental representations of objects. The argument from illusion supports indirect realism: what we see can differ from what exists.', 'Do we perceive reality directly?'),
            c('Empiricism vs Rationalism', 'ARTICLE', 'Empiricists (Locke, Hume) say knowledge comes from sensory experience. Rationalists (Descartes, Leibniz) say reason and innate ideas are primary sources. Kant synthesized both views.', 'The great debate about the source of knowledge'),
          ],
          questions: [
            q('Empiricism holds that knowledge comes from:', 'EASY', 'Empiricism: experience is the primary source of knowledge', 'Sensory experience', 'Innate ideas', 'Pure reason', 'Divine revelation'),
            q('Rationalism emphasizes knowledge from:', 'EASY', 'Rationalists prioritize reason and innate ideas', 'Reason and innate ideas', 'Sensory experience', 'Tradition', 'Authority'),
            q('The argument from illusion supports:', 'MEDIUM', 'Illusions show we sometimes perceive incorrectly, supporting indirect realism', 'Indirect realism', 'Direct realism', 'Idealism', 'Skepticism only'),
            q('Locke\'s tabula rasa means:', 'MEDIUM', 'The mind starts as a blank slate, all knowledge from experience', 'The mind is a blank slate at birth', 'Knowledge is innate', 'Reason is primary', 'Senses are unreliable'),
            q('Kant argued that knowledge requires both:', 'HARD', 'Kant synthesized empiricism and rationalism: experience and concepts', 'Experience and innate conceptual frameworks', 'Only experience', 'Only reason', 'Faith and reason'),
          ],
        },
        { name: 'Scientific Method', description: 'Philosophy of science and its methods', isFree: false, entryPrice: 100,
          contents: [
            c('Falsificationism', 'ARTICLE', 'Karl Popper argued that science progresses by falsification, not verification. A theory is scientific if it makes predictions that could be proven false. Unfalsifiable claims are not scientific.', 'Popper\'s criterion for science'),
            c('Kuhn\'s Paradigm Shifts', 'ARTICLE', 'Thomas Kuhn argued science doesn\'t progress linearly. Normal science works within a paradigm until anomalies accumulate, triggering a revolutionary paradigm shift (e.g., Newtonian to Einsteinian physics).', 'How scientific revolutions happen'),
          ],
          questions: [
            q('Popper\'s falsificationism says a theory is scientific if:', 'EASY', 'It must be possible to disprove it with evidence', 'It can be tested and potentially disproven', 'It has been verified many times', 'Scientists agree on it', 'It predicts the future'),
            q('A paradigm shift (Kuhn) is:', 'EASY', 'A fundamental change in the basic framework of a scientific field', 'A revolutionary change in scientific framework', 'A minor revision of theory', 'A political event', 'A logical proof'),
            q('The problem of induction for science is:', 'MEDIUM', 'We cannot prove that observed patterns will continue in the future', 'Past observations don\'t guarantee future patterns', 'Science is always wrong', 'Experiments are unreliable', 'Logic is circular'),
            q('According to Kuhn, normal science:', 'MEDIUM', 'Scientists solve puzzles within an accepted paradigm', 'Works within an accepted paradigm', 'Constantly questions everything', 'Seeks to overthrow current theories', 'Is not real science'),
            q('The underdetermination of theory by evidence means:', 'HARD', 'Multiple incompatible theories can be consistent with the same data', 'Evidence alone cannot determine which theory is correct', 'Evidence always supports one theory', 'Theories don\'t need evidence', 'All evidence is theory-laden'),
          ],
        },
        { name: 'Truth', description: 'Theories of what makes statements true', isFree: true, entryPrice: null,
          contents: [
            c('Correspondence Theory', 'ARTICLE', 'The correspondence theory says a statement is true if it corresponds to facts in the world. "Snow is white" is true if and only if snow is white. This is the most intuitive theory of truth.', 'Truth as matching reality'),
            c('Coherence and Pragmatic Theories', 'ARTICLE', 'The coherence theory says truth is consistency within a system of beliefs. Pragmatism (James, Dewey) says truth is what works — beliefs that prove useful in practice are true.', 'Alternative approaches to truth'),
          ],
          questions: [
            q('The correspondence theory says truth is:', 'EASY', 'A statement is true if it matches the facts', 'Agreement with facts', 'Coherence with other beliefs', 'What works in practice', 'What people agree on'),
            q('The coherence theory says truth is:', 'EASY', 'Truth = fitting consistently within a belief system', 'Consistency within a belief system', 'Matching external facts', 'Usefulness', 'Universal agreement'),
            q('Pragmatism defines truth as:', 'MEDIUM', 'What proves practically useful and workable', 'What works in practice', 'Correspondence with reality', 'Logical necessity', 'Divine revelation'),
            q('Tarski\'s semantic theory says:', 'MEDIUM', '"Snow is white" is true if and only if snow is white — the T-schema', '"P" is true iff P', 'Truth is undefinable', 'Truth is relative', 'All sentences are true'),
            q('The liar paradox "This statement is false" challenges:', 'HARD', 'If true, it\'s false; if false, it\'s true — it challenges any simple definition of truth', 'Simple definitions of truth', 'Correspondence theory only', 'Pragmatism only', 'Mathematical truth'),
          ],
        },
      ],
    },
    {
      name: 'Political Philosophy',
      description: 'Justice, power, rights, and the ideal society',
      houses: [
        { name: 'Justice', description: 'Theories of fairness and distribution', isFree: true, entryPrice: null,
          contents: [
            c('Rawls\' Theory of Justice', 'ARTICLE', 'John Rawls proposed choosing principles of justice from behind a "veil of ignorance" — not knowing your place in society. This yields two principles: equal basic liberties, and inequalities only if they benefit the least advantaged.', 'The most influential modern theory of justice'),
            c('Nozick\'s Libertarianism', 'ARTICLE', 'Robert Nozick argued for a minimal state protecting rights only. His entitlement theory says holdings are just if acquired justly. Taxation for redistribution is equivalent to forced labor.', 'Justice as respecting individual rights'),
          ],
          questions: [
            q('Rawls\' veil of ignorance means:', 'EASY', 'Choose principles without knowing your position in society', 'Not knowing your place in society', 'Being literally blind', 'Ignoring evidence', 'Trusting authority'),
            q('Rawls\' difference principle allows inequality if:', 'EASY', 'Inequalities must benefit the worst-off members', 'It benefits the least advantaged', 'Everyone agrees', 'It maximizes GDP', 'It is temporary'),
            q('Nozick\'s minimal state provides only:', 'MEDIUM', 'Protection against force, theft, fraud, and contract enforcement', 'Protection of rights and enforcement of contracts', 'Education and healthcare', 'Full welfare', 'Redistribution of wealth'),
            q('Distributive justice concerns:', 'MEDIUM', 'How goods, opportunities, and burdens are distributed in society', 'Fair allocation of resources and opportunities', 'Criminal punishment', 'International relations', 'Individual virtue'),
            q('The original position in Rawls\' theory is:', 'HARD', 'A hypothetical scenario where rational agents choose principles without self-knowledge', 'A hypothetical choice situation behind the veil of ignorance', 'The first political society', 'A historical state of nature', 'A democratic assembly'),
          ],
        },
        { name: 'Rights', description: 'Natural rights, human rights, and their foundations', isFree: true, entryPrice: null,
          contents: [
            c('Natural Rights', 'ARTICLE', 'Natural rights theory (Locke) holds that individuals have inherent rights to life, liberty, and property, existing prior to government. Government exists to protect these rights.', 'Rights that exist prior to government'),
            c('Human Rights', 'ARTICLE', 'Modern human rights are codified in the Universal Declaration of Human Rights (1948). They include civil, political, economic, social, and cultural rights. Debates continue about their universality and enforcement.', 'Universal rights for all people'),
          ],
          questions: [
            q('Locke argued that natural rights include:', 'EASY', 'Life, liberty, and property — government protects these', 'Life, liberty, and property', 'Happiness, wealth, and power', 'Education, health, and shelter', 'Speech, religion, and assembly'),
            q('Negative rights require others to:', 'EASY', 'Negative rights = others must refrain from interfering', 'Refrain from interfering', 'Provide resources', 'Take action', 'Pay taxes'),
            q('Positive rights require others to:', 'MEDIUM', 'Positive rights = others must provide something (e.g., education, healthcare)', 'Provide goods or services', 'Merely not interfere', 'Obey laws', 'Vote'),
            q('The UDHR was adopted in:', 'MEDIUM', 'The Universal Declaration of Human Rights: December 10, 1948', '1948', '1776', '1945', '1960'),
            q('Cultural relativism challenges human rights by arguing:', 'HARD', 'Different cultures have different values, so universal rights may be Western impositions', 'Universal standards may not apply across cultures', 'Rights don\'t exist', 'All cultures agree on rights', 'Only Western rights matter'),
          ],
        },
        { name: 'Democracy', description: 'Government by the people and its justifications', isFree: false, entryPrice: 80,
          contents: [
            c('Types of Democracy', 'ARTICLE', 'Direct democracy has citizens vote on every issue. Representative democracy has elected officials make decisions. Deliberative democracy emphasizes rational public discussion before decisions.', 'Different forms of democratic governance'),
            c('Challenges to Democracy', 'ARTICLE', 'The tyranny of the majority can oppress minorities. Voter ignorance challenges informed decision-making. Populism and misinformation threaten democratic institutions.', 'Problems and limitations of democratic systems'),
          ],
          questions: [
            q('In a direct democracy, citizens:', 'EASY', 'Citizens vote directly on laws and policies', 'Vote directly on issues', 'Elect representatives', 'Obey a monarch', 'Follow religious leaders'),
            q('Representative democracy involves:', 'EASY', 'Citizens elect officials to make decisions on their behalf', 'Electing officials to govern', 'Direct voting on all issues', 'Military rule', 'Hereditary leadership'),
            q('The tyranny of the majority refers to:', 'MEDIUM', 'Majority rule can oppress minorities', 'Majority oppressing minority rights', 'A dictator being popular', 'Everyone agreeing', 'Minority rule'),
            q('Deliberative democracy emphasizes:', 'MEDIUM', 'Rational public debate and discussion before making decisions', 'Reasoned public discussion', 'Quick voting', 'Expert rule', 'Majority vote only'),
            q('Arrow\'s impossibility theorem shows:', 'HARD', 'No voting system can perfectly translate individual preferences into group decisions', 'No perfect voting system exists for 3+ options', 'Democracy is impossible', 'Majority rule is always best', 'Voting is irrational'),
          ],
        },
        { name: 'Social Contract', description: 'The foundation of political authority', isFree: false, entryPrice: 100,
          contents: [
            c('Hobbes, Locke, and Rousseau', 'ARTICLE', 'Hobbes saw the state of nature as war, justifying absolute authority. Locke saw natural rights, justifying limited government. Rousseau saw natural freedom, justifying popular sovereignty.', 'Three visions of the social contract'),
            c('Modern Social Contract Theory', 'ARTICLE', 'Rawls revived social contract theory with his original position thought experiment. Gauthier applied it to rational choice theory. Scanlon asks what principles no one could reasonably reject.', 'Contemporary uses of the social contract idea'),
          ],
          questions: [
            q('Hobbes described the state of nature as:', 'EASY', 'Life is "solitary, poor, nasty, brutish, and short" without government', 'A war of all against all', 'A peaceful paradise', 'A democracy', 'A monarchy'),
            q('Locke\'s social contract preserves:', 'EASY', 'Government exists to protect natural rights; people consent', 'Natural rights (life, liberty, property)', 'Absolute monarchy', 'Religious authority', 'Military power'),
            q('Rousseau\'s "general will" represents:', 'MEDIUM', 'The common interest of the entire community', 'The collective interest of the community', 'The ruler\'s desire', 'Individual preferences', 'Majority opinion'),
            q('The social contract is:', 'MEDIUM', 'A hypothetical agreement legitimizing political authority', 'A theoretical agreement between people and government', 'An actual historical document', 'A legal contract', 'A religious covenant'),
            q('Scanlon\'s contractualism asks what principles:', 'HARD', 'Scanlon: right principles are those no one could reasonably reject', 'No one could reasonably reject', 'Maximize happiness', 'God commands', 'The strongest impose'),
          ],
        },
        { name: 'Power', description: 'The nature and distribution of political power', isFree: true, entryPrice: null,
          contents: [
            c('Theories of Power', 'ARTICLE', 'Weber defined power as the ability to impose one\'s will despite resistance. Foucault saw power as dispersed through social institutions and discourse, not just held by governments.', 'What power is and how it operates'),
            c('Legitimacy', 'ARTICLE', 'Political legitimacy asks: when is authority justified? Weber identified three sources: traditional (custom), charismatic (personal appeal), and rational-legal (rule of law and procedures).', 'What makes authority rightful'),
          ],
          questions: [
            q('Weber defined power as:', 'EASY', 'The ability to impose one\'s will on others', 'Imposing one\'s will despite resistance', 'Physical force only', 'Wealth', 'Knowledge'),
            q('Foucault argued that power is:', 'EASY', 'Power is everywhere, dispersed through institutions and discourse', 'Dispersed throughout society', 'Held only by government', 'Always oppressive', 'Purely economic'),
            q('Rational-legal authority is based on:', 'MEDIUM', 'Authority derived from established rules and procedures', 'Established laws and procedures', 'Personal charisma', 'Traditional customs', 'Military strength'),
            q('Charismatic authority comes from:', 'MEDIUM', 'The personal qualities and appeal of the leader', 'A leader\'s personal qualities', 'Legal procedures', 'Hereditary succession', 'Economic power'),
            q('Marx argued that political power ultimately derives from:', 'HARD', 'Control of the means of production determines political power', 'Control of the means of production', 'Military force', 'Religious authority', 'Democratic consent'),
          ],
        },
      ],
    },
  ],
};

export const kingdomsData: SeedKingdom[] = [mathematics, chemistry, physics, computerScience, philosophy];
