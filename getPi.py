#
#  getPi.py (derived from main.c)
#  Project: getPi
#
#  Created by neworld 10 on 5/26/25.
#  Converted to Python 3.
#

import math

def custom_sqr(base: float, exponent: float) -> float:
    """
    Calculates base raised to the power of exponent using recursion.
    This function mirrors the C version's logic, which assumes
    exponent is a non-negative whole number (passed as a float).
    """
    if exponent == 0.0:
        return 1.0
    # math.fmod behaves similarly to C's fmod for positive exponents.
    # For non-negative whole numbers passed as floats, exponent % 2.0 would also work.
    elif math.fmod(exponent, 2.0) == 0.0:  # exponent is even
        return custom_sqr(base * base, exponent / 2.0)
    else:  # exponent is odd
        return base * custom_sqr(base * base, (exponent - 1.0) / 2.0)

def main():
    """
    Calculates an approximation of Pi using the Leibniz formula
    and prints intermediate values for each term.
    """
    pi_approximation = 0.0
    # This variable corresponds to 'i' in the C code, which is a double
    # representing the term index (0.0, 1.0, 2.0, ...).
    current_term_index_i = 0.0 
    
    try:
        # Prompt for input, similar to C's printf(">>>");
        num_str = input(">>>")
        # In C, 'num' is the upper limit for 'i' (the term index).
        # The loop runs for i = 0, 1, ..., num_max_term_index.
        num_max_term_index = int(num_str)
    except ValueError:
        print("Invalid input. Please enter an integer.")
        return

    # Newline after input, similar to C's printf("\n");
    print() 
    
    # The C loop `for(int j = 0; j <= num; j++)` effectively iterates
    # `num + 1` times, with `i` taking values from 0 to `num`.
    for _ in range(num_max_term_index + 1):
        # Leibniz formula term: (-1)^i * (4 / (2*i + 1))
        sign = custom_sqr(-1.0, current_term_index_i)
        term_value = 4.0 / (2.0 * current_term_index_i + 1.0)
        
        pi_approximation += sign * term_value
        
        # Print the current approximation. C's %lf often defaults to 6 decimal places.
        print(f"{pi_approximation:.6f}") 
        
        current_term_index_i += 1.0

if __name__ == "__main__":
    main()
