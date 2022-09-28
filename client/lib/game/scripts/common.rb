def alpha_id(index)
    a, b = (index / 26).floor, index % 26
    return a == 0 ? (97 + b).chr : (96 + a).chr + (97 + b).chr
end

def alpha_square(diameter = 3)
    index = -1
    square = Array.new(diameter) { Array.new(diameter) { alpha_id(index += 1) } }
    return square
end

square = alpha_square(5)

print square.map { |row| row.map { |a| a + "\t" }.join + "\n" }.join