from __future__ import print_function
import urllib2 as ul
from pyquery import PyQuery


if __name__ == "__main__":
    url = 'http://news.sina.com.cn/'
    res = ul.urlopen(url=url).read()
    main_news = PyQuery(res).find('#syncad_1 h1>a')
    for news in main_news:
        print(PyQuery(news).text().encode('utf-8'))
        print(PyQuery(news).attr("href"))
