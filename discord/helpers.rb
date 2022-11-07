def format_standard(str); return "```\n#{str}\n```"; end
def format_info(str); return "```\n#{str}\n```"; end
def format_success(str); return "```diff\n+ #{str}\n```"; end
def format_error(str); return "```diff\n- #{str}\n```"; end
def format_usage(str); return "Command usage: ``#{PREFIX}#{str}``"; end
def format_help(str); return "```markdown\n#{str}\n```"; end
def format_quote(str); return ">>> #{str}"; end

def locale_minimap(locale)
    str = "|"
    (0...locale["height"]).each do |j|
        (0...locale["width"]).each do |i|
            index = j * locale["width"] + i
            str += (index == locale["index"]) ? "\\☺" : "░"
            str += "|"
        end
        str += "\n|"
    end
    return str[0..-2]
end

def locale_emoji_minimap(locale)
    str = ""
    (0...locale["height"]).each do |j|
        (0...locale["width"]).each do |i|
            index = j * locale["width"] + i
            str += (index == locale["index"]) ? ":negative_squared_cross_mark:" : ":green_square:"
        #   str += (index == locale["index"]) ? ":black_square_button:" : ":white_large_square:"
        end
        str += "\n"
    end
    return str
end