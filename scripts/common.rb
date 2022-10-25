def safe_colorize(text, color)
    begin
        require 'colorize'
        return text.colorize(color)
    rescue LoadError
        return text
    end
end

def alpha_id(index, prefix = nil)
    a, b = (index / 26).floor, index % 26
    id = a == 0 ? (97 + b).chr : (96 + a).chr + (97 + b).chr
    return prefix == nil ? id : [prefix, id].join('_')
end

def alpha_square(diameter = 3, prefix = nil)
    index = -1
    square = Array.new(diameter) { Array.new(diameter) { alpha_id(index += 1, prefix) } }
    return square
end

def alpha_square_debug(n = 5)
    square = alpha_square(n)
    print safe_colorize(square.map { |row| row.map { |a| a + "\t" }.join + "\n" }.join, :blue)
end

def square_n(square, target)
    square.each_with_index { |row, j| row.each_with_index { |id, i| return square[j - 1][i] if target == id } }
    return nil
end

def square_e(square, target)
    square.each { |row| row.each_with_index { |id, i| return row[(i + 1) % row.length] if target == id } }
    return nil
end

def square_s(square, target)
    square.each_with_index { |row, j| row.each_with_index { |id, i| return square[(j + 1) % square.length][i] if target == id } }
    return nil
end

def square_w(square, target)
    square.each { |row| row.each_with_index { |id, i| return row[i - 1] if target == id } }
    return nil
end

def square_neighbors(square, target)
    return {
        'N' => square_n(square, target),
        'E' => square_e(square, target),
        'S' => square_s(square, target),
        'W' => square_w(square, target),
    }
end