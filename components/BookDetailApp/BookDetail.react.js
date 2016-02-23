import '../../semantic-ui/components/item.min.css';
import React from 'react'
import { render } from 'react-dom'

import { Items, Item, Content, Link, Image, Loader, List } from '../react-semantify'

const BookDetail = React.createClass({
    render() {
        const book = this.props.book;
        return (
            <div>
                <Loader msg='正在加载中...' active={this.props.loading} />
                <Items >
                    <Item>
                        <Image className='small' src={book.image} />
                        <Content>
                            <Link className='header'>{book.title}</Link>
                            <div className='description'>
                                <List>
                                    <Item>
                                        作者：&nbsp;{book.author}
                                    </Item>
                                    <Item>
                                        出版社：&nbsp;{book.publisher}
                                    </Item>
                                    <Item>
                                        出版年：&nbsp;{book.pubdate}
                                    </Item>
                                    <Item>
                                        页数：&nbsp;{book.pubdate}
                                    </Item>
                                    <Item>
                                        定价：&nbsp;{book.price}
                                    </Item>
                                    <Item>
                                        装帧：&nbsp;{book.binding}
                                    </Item>
                                    <Item>
                                        ISBN：&nbsp;{book.isbn13}
                                    </Item>
                                </List>
                            </div>
                        </Content>
                    </Item>
                    <Item>
                        <Content>内容简介 · · · · · ·<br/>{book.summary}</Content>
                    </Item>
                    <Item>
                        <Content>作者简介 · · · · · ·<br/>{book.author_intro}</Content>
                    </Item>
                    <Item>
                        <Content>目录 · · · · · ·<br/>{book.catalog}</Content>
                    </Item>
                </Items>
            </div>
        );
    }
});

export default BookDetail
